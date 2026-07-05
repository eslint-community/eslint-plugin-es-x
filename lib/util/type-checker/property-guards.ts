import { findVariable, getStaticValue } from "@eslint-community/eslint-utils"
import type { Rule, SourceCode } from "eslint"
import type { TSESTree } from "@typescript-eslint/types"
import type * as ESTree from "estree"

import { getPropertyKeyValue } from "../get-property-key-value"
import { TypeName } from "eslint-type-tracer"

const TS_NODE_TYPES = [
    "TSAsExpression", // foo as number
    "TSTypeAssertion", // (<number>foo)
    "TSNonNullExpression", // foo!
    "TSInstantiationExpression", // foo<string>
    "TSSatisfiesExpression", // foo satisfies T
]

type JumpStatement =
    | TSESTree.ReturnStatement
    | TSESTree.ContinueStatement
    | TSESTree.BreakStatement
type GuardChecker = {
    test: (
        node: TSESTree.MemberExpression | TSESTree.Property,
        objectNode?: TSESTree.Expression,
    ) => boolean
    kind:
        | "instanceof"
        | "definedValue"
        | "definedType"
        | "hasValue"
        | "optional"
        | "unknown"
}
type MaybeGuard = Params & {
    prototypeGuard: boolean
    used: boolean
    isAvailableLocation: GuardChecker["test"]
}
type GuardsContext = {
    processGuard: (params: Params) => boolean
    isAvailableLocation: (params: Params) => boolean
    iterateUnusedGuards: () => Iterable<MaybeGuard>
}

export type PropertyType =
    | "string"
    | "number"
    | "bigint"
    | "boolean"
    | "symbol"
    | "undefined"
    | "object"
    | "function"
export type PropertyTypeMap = Partial<
    Record<TypeName, Record<string, PropertyType | PropertyType[]>>
>
export type Params = {
    node: TSESTree.MemberExpression | TSESTree.Property
    className: string
    propertyName: string
    objectNode: TSESTree.Expression
    objectTypeResult?: true | "aggressive"
}

/**
 * Create a context for property guards.
 * @param options The options.
 * @param options.propertyTypeMap The property names to disallow. The key is class names and that value is properties and types.
 * @param options.context The rule context.
 * @returns The guards context.
 */
export function createPropertyGuardsContext(options: {
    propertyTypeMap?: PropertyTypeMap
    context: Rule.RuleContext
}): GuardsContext {
    const context = options.context
    if (!getAllowTestedPropertyOption(context)) {
        return {
            processGuard() {
                return false
            },
            isAvailableLocation() {
                return false
            },
            iterateUnusedGuards() {
                return []
            },
        }
    }
    const sourceCode = context.sourceCode
    const propertyTypeMap: Partial<
        Record<TypeName, Record<string, PropertyType[]>>
    > = {}

    for (const [className, properties] of Object.entries(
        options.propertyTypeMap ?? {},
    ) as [TypeName, Record<string, PropertyType | PropertyType[]>][]) {
        propertyTypeMap[className] = {}
        for (const [propertyName, propertyType] of Object.entries(properties)) {
            propertyTypeMap[className][propertyName] = Array.isArray(
                propertyType,
            )
                ? propertyType
                : [propertyType]
        }
    }

    const maybeGuards = new Map<string, Map<string, MaybeGuard[]>>()

    /**
     * Checks whether the node is a prototype property access or not.
     * @param node The node to check.
     * @returns `true` if the node is a prototype property access.
     */
    function isPrototypePropertyAccess(
        node: TSESTree.MemberExpression | TSESTree.Property,
    ): boolean {
        if (node.type !== "MemberExpression") {
            return false
        }
        const object = node.object
        if (object.type !== "MemberExpression") {
            return false
        }
        return getPropertyKeyValue(object) === "prototype"
    }

    /**
     * If the node is a guard clause checking for the existence of a property,
     * returns a function to check if the property node is available.
     * @param node The node to check.
     * @param propertyTypes The property types to check.
     * @returns The guard checker.
     */
    // eslint-disable-next-line complexity
    function getGuardChecker(
        node: TSESTree.MemberExpression | TSESTree.Property,
        propertyTypes?: PropertyType[],
    ): GuardChecker | null {
        if (!propertyTypes || propertyTypes.length === 0) {
            // If the property type is unknown, the type is inferred from the property access usage and checked.
            return getGuardCheckerForUnknownType(node)
        }
        if (node.type !== "MemberExpression") {
            return null
        }
        const parent = getParent(node)
        if (!parent) {
            return null
        }
        if (parent.type === "BinaryExpression") {
            if (
                propertyTypes.includes("object") &&
                parent.operator === "instanceof"
            ) {
                // e.g. if (x.property instanceof X)
                const test = getGuardCheckerForExpression(parent)
                return test ? { test, kind: "instanceof" } : null
            }
            if (propertyTypes.includes("undefined")) {
                // If a property type has undefined,
                // checking if the property is undefined does not check for the existence of the property.
                return null
            }
            const staticValue = getStaticValue(
                (parent.left === node
                    ? parent.right
                    : parent.left) as ESTree.Node,
                sourceCode.getScope(parent as Rule.Node),
            )
            if (!staticValue) {
                return null
            }
            if (staticValue.value === undefined) {
                if (parent.operator === "!==" || parent.operator === "!=") {
                    // e.g. if (x.property !== undefined), if (x.property != undefined)
                    const test = getGuardCheckerForExpression(parent)
                    return test ? { test, kind: "definedValue" } : null
                } else if (
                    parent.operator === "===" ||
                    parent.operator === "=="
                ) {
                    // e.g. if (x.property === undefined), if (x.property == undefined)
                    const test = getGuardCheckerForExpression(parent, {
                        not: true,
                    })
                    return test ? { test, kind: "definedValue" } : null
                }
            } else if (staticValue.value === null) {
                if (parent.operator === "!=") {
                    // e.g. if (x.property != null)
                    const test = getGuardCheckerForExpression(parent)
                    return test ? { test, kind: "definedValue" } : null
                } else if (parent.operator === "==") {
                    // e.g. if (x.property == null)
                    const test = getGuardCheckerForExpression(parent, {
                        not: true,
                    })
                    return test ? { test, kind: "definedValue" } : null
                }
            }
            return null
        }
        if (parent.type === "UnaryExpression" && parent.operator === "typeof") {
            const pp = getParent(parent)
            if (!pp || pp.type !== "BinaryExpression") {
                return null
            }
            const staticValue = getStaticValue(
                (pp.left === parent ? pp.right : pp.left) as ESTree.Node,
                sourceCode.getScope(parent as Rule.Node),
            )
            if (!staticValue) {
                return null
            }
            const type =
                staticValue.value === "undefined"
                    ? "undefined"
                    : propertyTypes.includes(staticValue.value as PropertyType)
                      ? "defined"
                      : null
            if (!type) {
                return null
            }
            if (type === "undefined" && propertyTypes.includes("undefined")) {
                // If a property type has undefined,
                // checking if the property is undefined does not check for the existence of the property.
                return null
            }
            if (pp.operator === "!==" || pp.operator === "!=") {
                if (type === "undefined") {
                    // e.g. if (typeof x.property !== "undefined"), if (typeof x.property != "undefined")
                    const test = getGuardCheckerForExpression(pp)
                    return test ? { test, kind: "definedType" } : null
                }
                // e.g. if (typeof x.property !== "function"), if (typeof x.property != "function")
                const test = getGuardCheckerForExpression(pp, { not: true })
                return test ? { test, kind: "definedType" } : null
            } else if (pp.operator === "===" || pp.operator === "==") {
                if (type === "undefined") {
                    // e.g. if (typeof x.property === "undefined"), if (typeof x.property == "undefined")
                    const test = getGuardCheckerForExpression(pp, { not: true })
                    return test ? { test, kind: "definedType" } : null
                }
                // e.g. if (typeof x.property === "function"), if (typeof x.property == "function")
                const test = getGuardCheckerForExpression(pp)
                return test ? { test, kind: "definedType" } : null
            }
            return null
        }
        if (
            ((parent.type === "CallExpression" && parent.callee === node) ||
                (parent.type === "MemberExpression" &&
                    parent.object === node)) &&
            parent.optional
        ) {
            // e.g. x.property?.()
            return { test: (n) => n === node, kind: "optional" }
        }

        if (
            propertyTypes.every(
                (type) =>
                    // Ensure that the type does not result in a falsy value.
                    type !== "string" &&
                    type !== "number" &&
                    type !== "boolean" &&
                    type !== "bigint" &&
                    type !== "undefined",
            )
        ) {
            // e.g. if (x.property)
            const test = getGuardCheckerForExpression(node)
            return test ? { test, kind: "hasValue" } : null
        }
        return null
    }

    /**
     * @param node The node to check.
     * @param options The options.
     * @param options.not Whether to invert the guard.
     * @returns The guard tester.
     */
    function getGuardCheckerForExpression(
        node: TSESTree.Expression,
        { not = false }: { not?: boolean } = {},
    ): GuardChecker["test"] | null {
        const parent = getParent(node)
        if (!parent) {
            return null
        }
        if (parent.type === "ConditionalExpression") {
            const block = not ? parent.alternate : parent.consequent
            return (n) =>
                block.range[0] <= n.range[0] && n.range[1] <= block.range[1]
        }
        if (parent.type === "UnaryExpression" && parent.operator === "!") {
            return getGuardCheckerForExpression(parent, { not: !not })
        }
        if (parent.type === "IfStatement" && parent.test === node) {
            return getGuardCheckerForIfStatement(parent, { not })
        }
        if (
            !not &&
            parent.type === "LogicalExpression" &&
            parent.operator === "&&" &&
            parent.left === node
        ) {
            // e.g. typeof x.property !== 'undefined' && x.property
            const block = parent.right
            return (n) =>
                block.range[0] <= n.range[0] && n.range[1] <= block.range[1]
        }
        return null
    }

    /**
     * @param node The if statement node to check.
     * @param options The options.
     * @param options.not Whether to invert the guard.
     * @returns The guard tester.
     */
    function getGuardCheckerForIfStatement(
        node: TSESTree.IfStatement,
        { not = false }: { not?: boolean } = {},
    ): GuardChecker["test"] | null {
        if (!not) {
            const block = node.consequent
            return (n) =>
                block.range[0] <= n.range[0] && n.range[1] <= block.range[1]
        }
        if (node.alternate) {
            const block = node.alternate
            return (n) =>
                block.range[0] <= n.range[0] && n.range[1] <= block.range[1]
        }
        if (!hasJumpStatementInAllPath(node.consequent)) {
            return null
        }
        const parent = getParent(node)
        if (
            !parent ||
            (parent.type !== "BlockStatement" && parent.type !== "Program")
        ) {
            return null
        }
        const start = node.range[1]
        const end = parent.range[1]

        return (n) => start <= n.range[0] && n.range[1] <= end
    }

    /**
     * @param node The node to check.
     * @returns The guard checker.
     */
    function getGuardCheckerForUnknownType(
        node: TSESTree.MemberExpression | TSESTree.Property,
    ): GuardChecker | null {
        // If the property type is unknown, the type is inferred from the property access usage and checked.
        const primitiveChecker = getGuardChecker(node, [
            "string",
            "number",
            "boolean",
            "bigint",
            "symbol",
        ])
        const methodChecker = getGuardChecker(node, ["function"])
        const objectChecker = getGuardChecker(node, ["object"])
        if (!methodChecker && !primitiveChecker && !objectChecker) {
            return null
        }

        return {
            // eslint-disable-next-line complexity
            test(n) {
                if (
                    primitiveChecker?.test(n) ||
                    (objectChecker?.kind === "instanceof" &&
                        objectChecker.test(n))
                ) {
                    return true
                }
                const parent = getParent(n)
                if (
                    ((parent?.type === "CallExpression" ||
                        parent?.type === "NewExpression") &&
                        parent.callee === n) ||
                    (parent?.type === "TaggedTemplateExpression" &&
                        parent.tag === n)
                ) {
                    // If the property is called,
                    // it is checked to see if it is a method guard.
                    return Boolean(methodChecker?.test(n))
                }
                if (
                    parent?.type === "MemberExpression" &&
                    parent.object === n
                ) {
                    // If the property is property access,
                    // it is checked to see if it is a method guard or a object guard.
                    return Boolean(
                        methodChecker?.test(n) || objectChecker?.test(n),
                    )
                }
                return false
            },
            kind: "unknown",
        }
    }

    return {
        /**
         * Checks whether the node is in a location where the property is available or not.
         * @param params The parameters.
         * @param params.node The node to check.
         * @param params.className The class name to check.
         * @param params.propertyName The property name to check.
         * @param params.objectNode The object node to check.
         * @returns `true` if the property is available.
         */
        isAvailableLocation({ node, className, propertyName, objectNode }) {
            const guards = maybeGuards.get(className)?.get(propertyName) ?? []
            for (const guard of guards.toReversed()) {
                if (
                    guard.prototypeGuard ||
                    equalNode(guard.objectNode, objectNode, sourceCode)
                ) {
                    if (guard.isAvailableLocation(node, objectNode)) {
                        guard.used = true
                        return true
                    }
                }
            }
            return false
        },
        /**
         * Checks if the node is a guard clause that checks for the existence of a property.
         * If it is, it stores that information and uses it to check if the property node is available the next time it is visited.
         * @param params The parameters.
         * @param params.node The node to check.
         * @param params.className The class name to check.
         * @param params.propertyName The property name to check.
         * @param params.objectNode The object node to check.
         * @returns `true` if the node is a guard.
         */
        processGuard(params) {
            const checker = getGuardChecker(
                params.node,
                propertyTypeMap?.[params.className]?.[params.propertyName],
            )
            if (!checker) {
                return false
            }
            const guard: MaybeGuard = {
                ...params,
                prototypeGuard: isPrototypePropertyAccess(params.node),
                used:
                    // A optional chain allows the property access expression of its own.
                    // but we mark expressions that are candidates for guarding as used here because we won't check them later.
                    checker.kind === "optional",
                isAvailableLocation: checker.test,
            }
            let classGuards = maybeGuards.get(params.className)
            if (!classGuards) {
                classGuards = new Map()
                maybeGuards.set(params.className, classGuards)
            }
            let guards = classGuards.get(params.propertyName)
            if (!guards) {
                guards = []
                classGuards.set(params.propertyName, guards)
            }
            guards.push(guard)
            return true
        },
        /**
         * Iterate unused guards.
         * @returns The unused guards.
         */
        *iterateUnusedGuards() {
            for (const classGuards of maybeGuards.values()) {
                for (const guards of classGuards.values()) {
                    for (const guard of guards) {
                        if (!guard.used) {
                            yield guard
                        }
                    }
                }
            }
        },
    }
}

/**
 * Checks whether all paths of a given statement have jump statements.
 * @param statement The statement to check.
 * @returns `true` if all paths of a given statement have jump statements.
 */
function hasJumpStatementInAllPath(statement: TSESTree.Statement): boolean {
    if (isJumpStatement(statement)) {
        return true
    }
    if (statement.type === "BlockStatement") {
        return statement.body.some(hasJumpStatementInAllPath)
    }
    if (statement.type === "IfStatement") {
        if (!statement.alternate) {
            return false
        }
        return (
            hasJumpStatementInAllPath(statement.alternate) &&
            hasJumpStatementInAllPath(statement.consequent)
        )
    }
    return false
}

/**
 * Checks whether the given statement is a jump statement.
 * @param statement The statement to check.
 * @returns `true` if the given statement is a jump statement.
 */
function isJumpStatement(
    statement: TSESTree.Statement,
): statement is JumpStatement {
    return (
        statement.type === "ReturnStatement" ||
        statement.type === "ContinueStatement" ||
        statement.type === "BreakStatement"
    )
}

/**
 * Checks whether or not the two given nodes are same.
 * @param a A node 1 to compare.
 * @param b A node 2 to compare.
 * @param sourceCode The ESLint source code object.
 * @returns the source code for the given node.
 */
function equalNode(
    a: TSESTree.Expression,
    b: TSESTree.Expression,
    sourceCode: SourceCode,
): boolean {
    if (a.type === "Identifier" && b.type === "Identifier") {
        const leftVar = findVariable(
            sourceCode.getScope(a as Rule.Node),
            a as ESTree.Identifier,
        )
        const rightVar = findVariable(
            sourceCode.getScope(b as Rule.Node),
            b as ESTree.Identifier,
        )
        return Boolean(leftVar && rightVar && leftVar === rightVar)
    }
    if (a.type === "MemberExpression" && b.type === "MemberExpression") {
        if (!equalNode(a.object, b.object, sourceCode)) {
            return false
        }
        const leftKey = getPropertyKeyValue(a)
        const rightKey = getPropertyKeyValue(b)
        return Boolean(leftKey && rightKey) && leftKey === rightKey
    }
    if (isSkipExpression(a)) {
        return equalNode(a.expression, b, sourceCode)
    }
    if (isSkipExpression(b)) {
        return equalNode(a, b.expression, sourceCode)
    }
    return false
}

/**
 * @param node The node to get.
 * @returns The parent node.
 */
function getParent(node: TSESTree.Node): TSESTree.Node | null {
    const parent = node.parent
    if (parent && isSkipExpression(parent)) {
        return getParent(parent)
    }
    return parent ?? null
}

function isSkipExpression(
    node: TSESTree.Node,
): node is
    | TSESTree.ChainExpression
    | TSESTree.TSAsExpression
    | TSESTree.TSTypeAssertion
    | TSESTree.TSNonNullExpression
    | TSESTree.TSInstantiationExpression
    | TSESTree.TSSatisfiesExpression {
    return node.type === "ChainExpression" || TS_NODE_TYPES.includes(node.type)
}

/**
 * Get `allowTestedProperty` option value.
 * @param context The rule context.
 * @returns The gotten `allowTestedProperty` option value.
 */
function getAllowTestedPropertyOption(context: Rule.RuleContext): boolean {
    const options = context.options[0]
    const globalOptions = context.settings["es-x"] as
        | { allowTestedProperty?: unknown }
        | undefined

    if (options && typeof options.allowTestedProperty === "boolean") {
        return options.allowTestedProperty
    }
    if (
        globalOptions &&
        typeof globalOptions.allowTestedProperty === "boolean"
    ) {
        return globalOptions.allowTestedProperty
    }

    return false
}
