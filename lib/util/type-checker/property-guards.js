"use strict"

const { getPropertyKeyValue } = require("../get-property-key-value")

const {
    findVariable,
    getStaticValue,
} = require("@eslint-community/eslint-utils")

const TS_NODE_TYPES = [
    "TSAsExpression", // foo as number
    "TSTypeAssertion", // (<number>foo)
    "TSNonNullExpression", // foo!
    "TSInstantiationExpression", // foo<string>
    "TSSatisfiesExpression", // foo satisfies T
]

/**
 * @typedef {import("estree").MemberExpression} MemberExpression
 * @typedef {import("estree").Property} Property
 * @typedef {import("estree").Expression} Expression
 * @typedef {import("estree").BlockStatement} BlockStatement
 * @typedef {import("estree").Statement} Statement
 * @typedef {import("estree").ReturnStatement} ReturnStatement
 * @typedef {import("estree").ContinueStatement} ContinueStatement
 * @typedef {import("estree").BreakStatement} BreakStatement
 * @typedef {import("estree").IfStatement} IfStatement
 * @typedef {import("estree").Node} Node
 * @typedef {import("eslint").SourceCode} SourceCode
 * @typedef {import("eslint").Rule.RuleContext} RuleContext
 */

/**
 * @typedef {ReturnStatement|ContinueStatement|BreakStatement} JumpStatement
 */

module.exports = { createPropertyGuardsContext }

/**
 * @typedef {"string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"} PropertyType
 * @typedef {Record<string, Record<string, PropertyType|PropertyType[]>>} PropertyTypeMap
 */

/**
 * @typedef {object} Params
 * @property {MemberExpression|Property} node
 * @property {string} className
 * @property {string} propertyName
 * @property {Expression} objectNode
 */
/**
 * @typedef {object} GuardChecker
 * @property {(node: MemberExpression|Property)=>boolean} test
 * @property {"instanceof"|"definedValue"|"definedType"|"hasValue"|"optional"|"unknown"} kind
 */
/**
 * @typedef {object} MaybeGuard
 * @property {string} className
 * @property {string} propertyName
 * @property {Expression} objectNode
 * @property {boolean} prototypeGuard
 * @property {MemberExpression|Property} node
 * @property {true | "aggressive"} objectTypeResult
 * @property {boolean} used
 * @property {(node: MemberExpression|Property)=>boolean} isAvailableLocation
 */
/**
 * @typedef {object} GuardsContext
 * @property {(params: Params)=>boolean} processGuard
 * @property {(params: Params)=>boolean} isAvailableLocation
 * @property {()=>Iterable<MaybeGuard>} iterateUnusedGuards
 */

/**
 * Create a context for property guards.
 * @param {object} options The options.
 * @param {PropertyTypeMap} [options.propertyTypeMap] The property names to disallow. The key is class names and that value is properties and types.
 * @param {RuleContext} options.context
 * @returns {GuardsContext} The guards context.
 */
function createPropertyGuardsContext(options) {
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
    /** @type {PropertyTypeMap} */
    const propertyTypeMap = {}

    for (const [className, properties] of Object.entries(
        options.propertyTypeMap || {},
    )) {
        propertyTypeMap[className] = {}
        for (const [propertyName, propertyType] of Object.entries(properties)) {
            propertyTypeMap[className][propertyName] = Array.isArray(
                propertyType,
            )
                ? propertyType
                : [propertyType]
        }
    }

    /**
     * @type {Map<string, Map<string, MaybeGuard[]>>}
     */
    const maybeGuards = new Map()

    /**
     * Checks whether the node is a prototype property access or not.
     * @param {MemberExpression|Property} node
     * @returns {boolean} `true` if the node is a prototype property access.
     */
    function isPrototypePropertyAccess(node) {
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
     * @param {MemberExpression|Property} node
     * @param {PropertyType[]} [propertyTypes]
     * @returns {GuardChecker|null} The guard checker.
     */
    // eslint-disable-next-line complexity
    function getGuardChecker(node, propertyTypes) {
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
                /** @type {any} */ (
                    parent.left === node ? parent.right : parent.left
                ),
                sourceCode.getScope(parent),
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
            /** @type {Node|null} */
            const pp = getParent(parent)
            if (!pp || pp.type !== "BinaryExpression") {
                return null
            }
            const staticValue = getStaticValue(
                /** @type {any} */ (pp.left === parent ? pp.right : pp.left),
                sourceCode.getScope(parent),
            )
            if (!staticValue) {
                return null
            }
            const type =
                staticValue.value === "undefined"
                    ? "undefined"
                    : propertyTypes.includes(staticValue.value)
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
     * @param {Expression} node
     * @returns {((node: MemberExpression|Property)=>boolean)|null} The guard tester.
     */
    function getGuardCheckerForExpression(node, { not = false } = {}) {
        /** @type {Node|null} */
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
     * @param {IfStatement} node
     * @returns {((node: MemberExpression|Property)=>boolean)|null} The guard tester.
     */
    function getGuardCheckerForIfStatement(node, { not = false } = {}) {
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
        /** @type {Node|null} */
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
     * @param {MemberExpression|Property} node
     * @returns {GuardChecker|null} The guard checker.
     */
    function getGuardCheckerForUnknownType(node) {
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
                    return methodChecker?.test(n)
                }
                if (
                    parent?.type === "MemberExpression" &&
                    parent.object === n
                ) {
                    // If the property is property access,
                    // it is checked to see if it is a method guard or a object guard.
                    return methodChecker?.test(n) || objectChecker?.test(n)
                }
                return false
            },
            kind: "unknown",
        }
    }

    return {
        /**
         * Checks whether the node is in a location where the property is available or not.
         * @param {object} params
         * @param {MemberExpression|Property} params.node
         * @param {string} params.className
         * @param {string} params.propertyName
         * @param {Expression} params.objectNode
         * @returns {boolean} `true` if the property is available.
         */
        isAvailableLocation({ node, className, propertyName, objectNode }) {
            const guards = maybeGuards.get(className)?.get(propertyName) || []
            for (const guard of [...guards].reverse()) {
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
         * @param {object} params
         * @param {MemberExpression|Property} params.node
         * @param {string} params.className
         * @param {string} params.propertyName
         * @param {Expression} params.objectNode
         * @returns {boolean} `true` if the node is a guard.
         */
        processGuard(params) {
            const checker = getGuardChecker(
                params.node,
                propertyTypeMap?.[params.className]?.[params.propertyName],
            )
            if (!checker) {
                return false
            }
            /** @type {MaybeGuard} */
            const guard = {
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
         * @returns {IterableIterator<MaybeGuard>}
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
 * @param {Statement} statement
 * @returns {boolean}
 */
function hasJumpStatementInAllPath(statement) {
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
 * @param {Statement} statement
 * @returns {statement is JumpStatement}
 */
function isJumpStatement(statement) {
    return (
        statement.type === "ReturnStatement" ||
        statement.type === "ContinueStatement" ||
        statement.type === "BreakStatement"
    )
}

/**
 * Checks whether or not the two given nodes are same.
 * @param {Expression} a A node 1 to compare.
 * @param {Expression} b A node 2 to compare.
 * @param {SourceCode} sourceCode The ESLint source code object.
 * @returns {boolean} the source code for the given node.
 */
function equalNode(a, b, sourceCode) {
    if (a.type === "Identifier" && b.type === "Identifier") {
        const leftVar = findVariable(sourceCode.getScope(a), a)
        const rightVar = findVariable(sourceCode.getScope(b), b)
        return leftVar && rightVar && leftVar === rightVar
    }
    if (a.type === "MemberExpression" && b.type === "MemberExpression") {
        if (!equalNode(a.object, b.object, sourceCode)) {
            return false
        }
        const leftKey = getPropertyKeyValue(a)
        const rightKey = getPropertyKeyValue(b)
        return Boolean(leftKey && rightKey) && leftKey === rightKey
    }
    if (a.type === "ChainExpression" || TS_NODE_TYPES.includes(a.type)) {
        return equalNode(a.expression, b, sourceCode)
    }
    if (b.type === "ChainExpression" || TS_NODE_TYPES.includes(b.type)) {
        return equalNode(a, b.expression, sourceCode)
    }
    return false
}

/**
 * @param {Node} node
 * @returns {Node|null}
 */
function getParent(node) {
    const parent = node.parent
    if (
        parent &&
        (parent.type === "ChainExpression" ||
            TS_NODE_TYPES.includes(parent.type))
    ) {
        return getParent(parent)
    }
    return parent
}

/**
 * Get `allowTestedProperty` option value.
 * @param {RuleContext} context The rule context.
 * @returns {boolean} The gotten `allowTestedProperty` option value.
 */
function getAllowTestedPropertyOption(context) {
    const options = context.options[0]
    const globalOptions = context.settings["es-x"]

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
