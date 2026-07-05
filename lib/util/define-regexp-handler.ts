import { RegExpValidator } from "@eslint-community/regexpp"
import type { Rule } from "eslint"
import type {
    Program,
    RegExpLiteral,
    NewExpression,
    SimpleCallExpression,
} from "estree"
import { getRegExpCalls } from "../utils"

type RuleValidator = RegExpValidator.Options & { onExit?: () => void }
type RegExpVisitorBuilder = (
    node: NewExpression | SimpleCallExpression | RegExpLiteral,
    regexp: { pattern: string; flags: string },
) => RuleValidator

const allVisitorBuilder = new WeakMap<Program, RegExpVisitorBuilder[]>()

/**
 * Define handlers to regexp nodes.
 * @param context The rule context.
 * @param visitorBuilder The regexp node visitor builder.
 * @returns The defined handlers.
 */
export function defineRegExpHandler(
    context: Rule.RuleContext,
    visitorBuilder: RegExpVisitorBuilder,
): Rule.RuleListener {
    const sourceCode = context.sourceCode
    const programNode = sourceCode.ast

    let handler: Rule.RuleListener = {}
    let builders = allVisitorBuilder.get(programNode)
    if (!builders) {
        builders = []
        allVisitorBuilder.set(programNode, builders)
        handler = {
            "Literal[regex]"(node) {
                const { pattern, flags } = (node as RegExpLiteral).regex
                visitRegExp(builders, node, pattern ?? "", flags ?? "")
            },

            "Program:exit"() {
                allVisitorBuilder.delete(programNode)

                const scope = sourceCode.getScope(programNode)
                for (const { node, pattern, flags } of getRegExpCalls(scope)) {
                    visitRegExp(builders, node, pattern ?? "", flags ?? "")
                }
            },
        }
    }

    builders.push(visitorBuilder)

    return handler
}

/**
 * Visit a given regular expression.
 * @param visitorBuilders The array of validator options builders.
 * @param node The AST node to report.
 * @param pattern The pattern part of a RegExp.
 * @param flags The flags part of a RegExp.
 * @returns void
 */
function visitRegExp(
    visitorBuilders: RegExpVisitorBuilder[],
    node: NewExpression | SimpleCallExpression | RegExpLiteral,
    pattern: string,
    flags: string,
): void {
    try {
        const visitors = visitorBuilders.map((r) => r(node, { pattern, flags }))
        const composedVisitor = composeRegExpVisitors(visitors)

        new RegExpValidator(composedVisitor).validatePattern(
            pattern,
            0,
            pattern.length,
            {
                unicode: flags.includes("u"),
                unicodeSets: flags.includes("v"),
            },
        )

        if (typeof composedVisitor.onExit === "function") {
            composedVisitor.onExit()
        }
    } catch (error) {
        //istanbul ignore else
        if (error.message.startsWith("Invalid regular expression:")) {
            return
        }
        //istanbul ignore next
        throw error
    }
}

/**
 * Returns a single visitor handler that executes all the given visitors.
 * @param visitors The visitors to compose.
 * @returns The composed visitor handler.
 */
function composeRegExpVisitors(visitors: RuleValidator[]): RuleValidator {
    const result = {} as RuleValidator

    for (const visitor of visitors) {
        const entries = Object.entries(visitor) as [
            string,
            (...args: unknown[]) => void,
        ][]

        for (const [key, fn] of entries) {
            const orig = result[key]
            if (orig) {
                result[key] = (...args) => {
                    orig(...args)
                    fn(...args)
                }
            } else {
                result[key] = fn
            }
        }
    }

    return result
}
