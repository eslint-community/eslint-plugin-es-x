import { READ, ReferenceTracker } from "@eslint-community/eslint-utils"
import type { Rule } from "eslint"
import type { BuiltinGlobalObjectName } from "../types"

type TraceMap = Parameters<ReferenceTracker["iterateGlobalReferences"]>[0]
type TraceMapObject = TraceMap[string]

/**
 * Define handlers to disallow global objects.
 * @param context The rule context.
 * @param names The global object names to disallow.
 * @returns The defined handlers.
 */
export function defineGlobalsHandler(
    context: Rule.RuleContext,
    names: BuiltinGlobalObjectName[],
): Rule.RuleListener {
    const sourceCode = context.sourceCode
    return {
        "Program:exit"(program) {
            const tracker = new ReferenceTracker(sourceCode.getScope(program))
            const traceMap: TraceMap = {}
            for (const className of names) {
                let map: TraceMapObject = traceMap
                for (const name of className.split(".")) {
                    map = map[name] || (map[name] = {})
                }
                map[READ] = true
            }
            for (const { node, path } of tracker.iterateGlobalReferences(
                traceMap,
            )) {
                context.report({
                    node,
                    messageId: "forbidden",
                    data: { name: path.join(".") },
                })
            }
        },
    }
}
