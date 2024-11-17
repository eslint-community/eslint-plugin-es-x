"use strict"

const {
    findVariable,
    getPropertyName,
} = require("@eslint-community/eslint-utils")
const { getSourceCode } = require("eslint-compat-utils")
const { WELLKNOWN_GLOBALS, getPropertyType } = require("./es-types")
const { checkExpressionNodeType } = require("./utils")

module.exports = { buildObjectTypeChecker, buildExpressionTypeProvider }

/**
 * @typedef {import("eslint").Rule.RuleContext} RuleContext
 * @typedef {import("estree").MemberExpression} MemberExpression
 * @typedef {import("estree").Expression} Expression
 * @typedef {import("estree").FunctionExpression} FunctionExpression
 * @typedef {import("estree").ArrowFunctionExpression} ArrowFunctionExpression
 * @typedef {import("estree").FunctionDeclaration} FunctionDeclaration
 */

/**
 * @typedef {import('./types').TypeInfo} TypeInfo
 */

/**
 * Build object type checker.
 * @param {RuleContext} context The rule context.
 * @param {boolean | "aggressive"} aggressiveResult The value to return if the type cannot be determined.
 * @returns {((memberAccessNode: MemberExpression|Property, objectNode: Expression, className: string) => boolean | "aggressive") | null} Returns an object type checker.
 */
function buildObjectTypeChecker(context, aggressiveResult) {
    const getType = buildExpressionTypeProvider(context)
    return function (_memberAccessNode, objectNode, className) {
        const result = checkExpressionNodeType(objectNode, className)
        if (result != null) {
            return result
        }

        const type = getType(objectNode)
        if (type == null) {
            return aggressiveResult
        }
        return type === className
    }
}

const cache = new WeakMap()

/**
 * Build expression type provider.
 * @param {RuleContext} context The rule context.
 * @returns {((node: Expression) => TypeInfo | null)} Returns an expression type provider.
 */
function buildExpressionTypeProvider(context) {
    const key = getSourceCode(context).ast
    let result = cache.get(key)
    if (!result) {
        cache.set(key, (result = buildExpressionTypeProviderImpl(context)))
    }
    return result
}

/**
 * Build expression type provider.
 * @param {RuleContext} context The rule context.
 * @returns {((node: Expression) => TypeInfo | null)} Returns an expression type provider.
 */
function buildExpressionTypeProviderImpl(context) {
    /** @type {Record<Expression['type']|'FunctionDeclaration', (node: Expression|FunctionDeclaration) => TypeInfo | null>} */
    const GET_TYPE_INFOS = {
        ArrayExpression: () => ({ type: "Array" }),
        ObjectExpression: () => ({ type: "Object" }),
        FunctionDeclaration: getFunctionTypeInfo,
        ArrowFunctionExpression: getFunctionTypeInfo,
        FunctionExpression: getFunctionTypeInfo,
        Literal: getLiteralTypeInfo,
        TemplateLiteral: () => ({ type: "String" }),
        Identifier: getIdentifierTypeInfo,
        ImportExpression: () => ({ type: "Promise" }),
        MemberExpression: getMemberExpressionTypeInfo,
        /** @param {import("estree").BinaryExpression} node */
        BinaryExpression: (node) =>
            getOperatorTypeInfo(node.operator, node.left, node.right),
        /** @param {import("estree").LogicalExpression} node */
        LogicalExpression: (node) =>
            getOperatorTypeInfo(node.operator, node.left, node.right),
        /** @param {import("estree").AssignmentExpression} node */
        AssignmentExpression: (node) =>
            getOperatorTypeInfo(node.operator, node.left, node.right),
        UnaryExpression: getUnaryExpressionTypeInfo,
        UpdateExpression: () => ({ type: "Number" }),
        ClassExpression: () => ({ type: "Function" }),
        ChainExpression: (node) => getTypeInfo(node.expression),
        /** @param {import("estree").SequenceExpression} node */
        SequenceExpression: (node) =>
            getTypeInfo(node.expressions[node.expressions.length - 1]),
        CallExpression: getCallExpressionTypeInfo,
        NewExpression: getCallExpressionTypeInfo,
        TaggedTemplateExpression: getCallExpressionTypeInfo,
        /** @param {import("estree").ConditionalExpression} node */
        ConditionalExpression(node) {
            const consequent = getTypeInfo(node.consequent)
            const alternate = getTypeInfo(node.alternate)
            return {
                get type() {
                    return consequent?.type === alternate?.type
                        ? (consequent?.type ?? null)
                        : null
                },
                get return() {
                    return consequent?.return?.type === alternate?.return?.type
                        ? (consequent?.return?.type ?? null)
                        : null
                },
            }
        },
    }

    const trackedTypeInfo = new Map()
    return (node) => getTypeInfo(node)?.type ?? null

    /**
     * Gets the type info of the given node.
     * @param {Expression|FunctionDeclaration} node The Expression node
     * @returns {TypeInfo | null} The type info of expression.
     */
    function getTypeInfo(node) {
        if (trackedTypeInfo.has(node)) {
            return trackedTypeInfo.get(node)
        }
        trackedTypeInfo.set(node, null)
        try {
            const result = GET_TYPE_INFOS[node.type]?.(node) ?? null
            trackedTypeInfo.set(node, result)
            return result
        } catch {
            return null
        }
    }

    /**
     * @param {import("estree").Identifier} node
     * @returns {import("eslint").Scope.Variable | null}
     */
    function findVariableFromIdentifier(node) {
        return findVariable(
            getSourceCode(context).scopeManager.globalScope,
            node,
        )
    }

    /**
     * @param {import("estree").Literal} node
     * @returns {TypeInfo | null}
     */
    function getLiteralTypeInfo(node) {
        if (node.regex) {
            return { type: "RegExp" }
        }
        if (node.bigint) {
            return { type: "BigInt" }
        }
        if (node.value == null) {
            return { type: "null" }
        }
        const valueType = typeof node.value
        if (valueType === "string") {
            return { type: "String" }
        }
        if (valueType === "number") {
            return { type: "Number" }
        }
        if (valueType === "boolean") {
            return { type: "Boolean" }
        }
        return { type: valueType[0].toUpperCase() + valueType.slice(1) }
    }

    /**
     * @param {import("estree").Identifier} node
     * @returns {TypeInfo | null}
     */
    function getIdentifierTypeInfo(node) {
        const variable = findVariableFromIdentifier(node)
        if (!variable) {
            return null
        }
        if (variable.defs.length === 0) {
            // It is a global variable
            return WELLKNOWN_GLOBALS[node.name]
        }
        if (variable.defs.length !== 1) {
            return null
        }
        const def = variable.defs[0]
        if (def.type === "Variable") {
            if (
                // It has an initial value.
                def.node.init &&
                // It does not write new values.
                def.parent.kind === "const"
            ) {
                // The type of the initial value is the type of the variable.
                const init = getTypeInfo(def.node.init)
                return init && getPatternTypeInfo(def.name, def.node.id, init)
            }
            if (def.parent.kind === "const") {
                return null
            }
            return getAssignableVariableTypeInfo(variable)
        } else if (def.type === "FunctionName") {
            return getTypeInfo(def.node)
        }
        return null
    }

    /**
     * @param {import("eslint").Scope.Variable} variable
     * @returns {TypeInfo | null}
     */
    function getAssignableVariableTypeInfo(variable) {
        /** @type {TypeInfo[]} */
        const typeInfos = []
        for (const reference of variable.references) {
            if (!reference.writeExpr) {
                continue
            }
            /** @type {import("estree").Node|null} */
            const parent = reference.writeExpr.parent
            if (!parent) {
                return null // unknown
            }
            if (parent.type === "VariableDeclarator") {
                if (reference.writeExpr !== parent.init) {
                    return null // unknown
                }
                const init = getTypeInfo(reference.writeExpr)
                if (!init) {
                    return null // unknown
                }
                const typeInfo = getPatternTypeInfo(
                    reference.identifier,
                    parent.id,
                    init,
                )
                if (!typeInfo) {
                    return null // unknown
                }
                typeInfos.push(typeInfo)
            } else if (parent.type === "AssignmentExpression") {
                if (reference.writeExpr !== parent.right) {
                    return null // unknown
                }
                const right = getTypeInfo(reference.writeExpr)
                if (!right) {
                    return null // unknown
                }
                const typeInfo = getPatternTypeInfo(
                    reference.identifier,
                    parent.left,
                    right,
                )
                if (!typeInfo) {
                    return null // unknown
                }
                typeInfos.push(typeInfo)
            }
        }
        const firstTypeInfo = typeInfos.shift()
        if (!firstTypeInfo) {
            return null
        }
        if (!typeInfos.length) {
            return firstTypeInfo
        }
        if (typeInfos.every((t) => t.type === firstTypeInfo.type)) {
            return {
                type: firstTypeInfo.type,
                get return() {
                    if (
                        typeInfos.every(
                            (t) => t.return === firstTypeInfo.return,
                        )
                    ) {
                        return firstTypeInfo.return
                    }
                    return null
                },
            }
        }
        return null
    }

    /**
     * @param {import("estree").BinaryOperator
     *   | import("estree").LogicalOperator
     *   | import("estree").AssignmentOperator} operator
     * @param {import("estree").Expression} leftNode
     * @param {import("estree").Expression} rightNode
     * @returns {TypeInfo | null}
     */
    // eslint-disable-next-line complexity
    function getOperatorTypeInfo(operator, leftNode, rightNode) {
        if (operator === "=") {
            return getTypeInfo(rightNode)
        }
        if (operator === "+" || operator === "+=") {
            return getPlusOperatorTypeInfo(leftNode, rightNode)
        }
        if (
            operator === "==" ||
            operator === "!=" ||
            operator === "===" ||
            operator === "!==" ||
            operator === "<" ||
            operator === "<=" ||
            operator === ">" ||
            operator === ">=" ||
            operator === "in" ||
            operator === "instanceof"
        ) {
            return { type: "Boolean" }
        }
        if (
            operator === "-" ||
            operator === "-=" ||
            operator === "*" ||
            operator === "*=" ||
            operator === "/" ||
            operator === "/=" ||
            operator === "%" ||
            operator === "%=" ||
            operator === "^" ||
            operator === "^=" ||
            operator === "**" ||
            operator === "**=" ||
            operator === "&" ||
            operator === "&=" ||
            operator === "|" ||
            operator === "|="
        ) {
            const left = getTypeInfo(leftNode)
            const right = getTypeInfo(rightNode)
            if (left?.type === "BigInt" || right?.type === "BigInt") {
                return { type: "BigInt" }
            }
            return left?.type == null && right?.type == null
                ? null
                : { type: "Number" }
        }
        if (
            operator === "<<" ||
            operator === "<<=" ||
            operator === ">>" ||
            operator === ">>=" ||
            operator === ">>>" ||
            operator === ">>>="
        ) {
            return { type: "Number" }
        }
        if (
            operator === "&&" ||
            operator === "&&=" ||
            operator === "||" ||
            operator === "||=" ||
            operator === "??" ||
            operator === "??="
        ) {
            const left = getTypeInfo(leftNode)
            const right = getTypeInfo(rightNode)
            return left?.type && left.type === right?.type
                ? { type: left.type }
                : null
        }
        return null
    }

    /**
     * @param {import("estree").Expression} leftNode
     * @param {import("estree").Expression} rightNode
     * @returns {TypeInfo | null}
     */
    // eslint-disable-next-line complexity
    function getPlusOperatorTypeInfo(leftNode, rightNode) {
        const left = getTypeInfo(leftNode)
        const right = getTypeInfo(rightNode)
        if (left?.type === "String" || right?.type === "String") {
            return { type: "String" }
        }
        if (left?.type === "BigInt" || right?.type === "BigInt") {
            return { type: "BigInt" }
        }
        if (right?.type === "Number") {
            return { type: "Number" }
        }
        if (left?.type === "Number") {
            if (right?.type === "null" || right?.type === "undefined") {
                return { type: "Number" }
            }
        }
        if (right == null) {
            return null
        }
        return { type: "String" }
    }

    /**
     * @param {import("estree").UnaryExpression} node
     * @returns {TypeInfo | null}
     */
    function getUnaryExpressionTypeInfo(node) {
        if (node.operator === "!" || node.operator === "delete") {
            return { type: "Boolean" }
        }
        if (node.operator === "+") {
            return { type: "Number" }
        }
        if (node.operator === "-" || node.operator === "~") {
            const argument = getTypeInfo(node.argument)
            if (argument?.type === "BigInt") {
                return { type: "BigInt" }
            }
            return argument == null ? null : { type: "Number" }
        }
        if (node.operator === "typeof") {
            return { type: "String" }
        }
        if (node.operator === "void") {
            return { type: "undefined" }
        }
        return null
    }

    /**
     * @param {import("estree").SimpleCallExpression | import("estree").NewExpression | import("estree").TaggedTemplateExpression} node
     * @returns {TypeInfo | null}
     */
    function getCallExpressionTypeInfo(node) {
        const callee =
            node.type === "CallExpression" || node.type === "NewExpression"
                ? node.callee
                : node.tag
        return getTypeInfo(callee)?.return ?? null
    }

    /**
     * @param {FunctionExpression|ArrowFunctionExpression|FunctionDeclaration} node
     * @returns {TypeInfo | null}
     */
    function getFunctionTypeInfo(node) {
        return {
            type: "Function",
            get return() {
                if (node.async) {
                    return { type: "Promise" }
                }
                if (node.generator) {
                    return { type: "Iterator" }
                }
                if (node.body.type !== "BlockStatement") {
                    return getTypeInfo(node.body)
                }
                /** @type { TypeInfo | null} */
                let returnStatement = null
                for (const st of iterateReturn(node.body.body)) {
                    if (!st.argument) {
                        continue
                    }
                    const argument = getTypeInfo(st.argument)
                    if (!returnStatement) {
                        returnStatement = argument
                    } else if (returnStatement.type === argument.type) {
                        /** @type {TypeInfo} */
                        const base = returnStatement
                        // Merge return type
                        returnStatement = {
                            type: base.type,
                            get return() {
                                const type1 = base.return?.type
                                const type2 = argument.return?.type
                                if (!type1 || !type2 || type1 !== type2) {
                                    return null
                                }
                                return {
                                    type: type1,
                                }
                            },
                        }
                    } else {
                        return null
                    }
                }

                return returnStatement

                /**
                 * @param {import('estree').Statement[]} statements
                 */
                // eslint-disable-next-line complexity
                function* iterateReturn(statements) {
                    for (const statement of statements) {
                        if (statement.type === "ReturnStatement") {
                            yield statement
                        } else if (statement.type === "BlockStatement") {
                            yield* iterateReturn(statement.body)
                        } else if (
                            statement.type === "LabeledStatement" ||
                            statement.type === "WithStatement" ||
                            statement.type === "ForStatement" ||
                            statement.type === "ForInStatement" ||
                            statement.type === "ForOfStatement" ||
                            statement.type === "WhileStatement" ||
                            statement.type === "DoWhileStatement"
                        ) {
                            yield* iterateReturn([statement.body])
                        } else if (statement.type === "IfStatement") {
                            yield* iterateReturn([statement.consequent])
                            if (statement.alternate) {
                                yield* iterateReturn([statement.alternate])
                            }
                        } else if (statement.type === "SwitchStatement") {
                            for (const caseClause of statement.cases) {
                                yield* iterateReturn(caseClause.consequent)
                            }
                        } else if (statement.type === "TryStatement") {
                            yield* iterateReturn([statement.block])
                            if (statement.handler) {
                                yield* iterateReturn([statement.handler.body])
                            }
                            if (statement.finalizer) {
                                yield* iterateReturn([statement.finalizer])
                            }
                        }
                    }
                }
            },
        }
    }

    /**
     * @param {import('estree').MemberExpression} node
     * @returns {TypeInfo | null}
     */
    function getMemberExpressionTypeInfo(node) {
        const propertyName = getPropertyName(
            node,
            getSourceCode(context).getScope(node),
        )
        if (propertyName == null) {
            return null
        }
        const object = getTypeInfo(node.object)
        if (!object) {
            return null
        }
        if (propertyName === "prototype" && object.prototypeType) {
            return { type: object.prototypeType }
        }
        return getPropertyType(object, propertyName)
    }

    /**
     * @param {import('estree').Identifier} id
     * @param {import('estree').Pattern} pattern
     * @param {TypeInfo} expression
     * @returns {TypeInfo | null}
     */
    function getPatternTypeInfo(id, pattern, expression) {
        if (pattern.type === "Identifier") {
            return pattern === id ? expression : null
        }
        if (pattern.type === "ObjectPattern") {
            for (const prop of pattern.properties) {
                if (prop.type !== "Property") {
                    continue
                }
                const propertyName = getPropertyName(
                    prop,
                    getSourceCode(context).getScope(pattern),
                )
                if (propertyName == null) {
                    continue
                }
                const property = getPropertyType(expression, propertyName)
                if (property == null) {
                    continue
                }
                const patternType = getPatternTypeInfo(id, prop.value, property)
                if (patternType != null) {
                    return patternType
                }
            }
            return null
        }
        if (pattern.type === "ArrayPattern") {
            for (const [index, entry] of pattern.elements.entries()) {
                if (!entry) {
                    continue
                }
                const indexType = getPropertyType(expression, index)
                if (indexType == null) {
                    continue
                }
                const patternType = getPatternTypeInfo(id, entry, indexType)
                if (patternType != null) {
                    return patternType
                }
            }
            return null
        }
        if (pattern.type === "AssignmentPattern") {
            return getPatternTypeInfo(id, pattern.left, expression)
        }
        return null
    }
}
