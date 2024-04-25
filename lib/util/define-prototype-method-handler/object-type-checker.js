"use strict"

const { findVariable } = require("@eslint-community/eslint-utils")
const { getSourceCode } = require("eslint-compat-utils")

module.exports = { buildObjectTypeChecker, buildExpressionTypeProvider }

/**
 * @typedef {import("eslint").Rule.RuleContext} RuleContext
 * @typedef {import("estree").MemberExpression} MemberExpression
 * @typedef {import("estree").Expression} Expression
 */

/**
 * @typedef {"Array"
 *         | "Date"
 *         | "Function"
 *         | "Intl.Collator"
 *         | "Intl.DateTimeFormat"
 *         | "Intl.ListFormat"
 *         | "Intl.NumberFormat"
 *         | "Intl.PluralRules"
 *         | "Intl.RelativeTimeFormat"
 *         | "Intl.Segmenter"
 *         | "Promise"
 *         | "RegExp"
 *         | "String"
 *         | "Symbol"
 *         | "Int8Array"
 *         | "Uint8Array"
 *         | "Uint8ClampedArray"
 *         | "Int16Array"
 *         | "Uint16Array"
 *         | "Int32Array"
 *         | "Uint32Array"
 *         | "Float32Array"
 *         | "Float64Array"
 *         | "BigInt64Array"
 *         | "BigUint64Array"
 *         | "Object"
 *         | "Number"
 *         | "Boolean"
 *         | "BigInt"
 *         | "null"
 *         | "undefined"
 *  } TypeName
 */

/**
 * @typedef {Record<
 *   string,
 *     BasicIdentifierObject
 *   | FunctionIdentifierObject
 *   | undefined>
 * } IdentifierObjects
 */
/**
 * @typedef {object} BasicIdentifierObject
 * @property {Exclude<TypeName, "Function">} type
 * @property {IdentifierObject} [properties]
 */
/**
 * @typedef {object} FunctionIdentifierObject
 * @property {"Function"} type
 * @property {TypeName|null} returnType
 * @property {IdentifierObject} [properties]
 */

/** @type {IdentifierObjects} */
const WELLKNOWN_GLOBALS = {
    String: {
        type: "Function",
        returnType: "String",
        properties: {
            raw: { type: "Function", returnType: "String" },
        },
    },
    Number: {
        type: "Function",
        returnType: "Number",
        properties: {
            isFinite: { type: "Function", returnType: "Boolean" },
            isInteger: { type: "Function", returnType: "Boolean" },
            isNaN: { type: "Function", returnType: "Boolean" },
            isSafeInteger: { type: "Function", returnType: "Boolean" },
            parseFloat: { type: "Function", returnType: "Number" },
            parseInt: { type: "Function", returnType: "Number" },
        },
    },
    Boolean: { type: "Function", returnType: "Boolean" },
    Symbol: {
        type: "Function",
        returnType: "Symbol",
        properties: {
            asyncIterator: { type: "Symbol" },
            hasInstance: { type: "Symbol" },
            isConcatSpreadable: { type: "Symbol" },
            iterator: { type: "Symbol" },
            match: { type: "Symbol" },
            matchAll: { type: "Symbol" },
            replace: { type: "Symbol" },
            search: { type: "Symbol" },
            species: { type: "Symbol" },
            split: { type: "Symbol" },
            toPrimitive: { type: "Symbol" },
            toStringTag: { type: "Symbol" },
            unscopables: { type: "Symbol" },
            for: { type: "Function", returnType: "Symbol" },
            keyFor: { type: "Function", returnType: "String" },
        },
    },
    BigInt: {
        type: "Function",
        returnType: "BigInt",
        properties: {
            asIntN: { type: "Function", returnType: "BigInt" },
            asUintN: { type: "Function", returnType: "BigInt" },
        },
    },
    Object: {
        type: "Function",
        returnType: "Object",
        properties: {
            assign: { type: "Function", returnType: "Object" },
            create: { type: "Function", returnType: "Object" },
            defineProperties: { type: "Function", returnType: "Object" },
            defineProperty: { type: "Function", returnType: "Object" },
            entries: { type: "Function", returnType: "Array" },
            freeze: { type: "Function", returnType: "Object" },
            fromEntries: { type: "Function", returnType: "Object" },
            getOwnPropertyDescriptor: {
                type: "Function",
                returnType: "Object",
            },
            getOwnPropertyDescriptors: {
                type: "Function",
                returnType: "Object",
            },
            getOwnPropertyNames: { type: "Function", returnType: "Array" },
            getOwnPropertySymbols: { type: "Function", returnType: "Array" },
            getPrototypeOf: { type: "Function", returnType: "Object" },
            groupBy: { type: "Function", returnType: "Object" },
            hasOwn: { type: "Function", returnType: "Boolean" },
            is: { type: "Function", returnType: "Boolean" },
            isExtensible: { type: "Function", returnType: "Boolean" },
            isFrozen: { type: "Function", returnType: "Boolean" },
            isSealed: { type: "Function", returnType: "Boolean" },
            keys: { type: "Function", returnType: "Array" },
            preventExtensions: { type: "Function", returnType: "Object" },
            seal: { type: "Function", returnType: "Object" },
            setPrototypeOf: { type: "Function", returnType: "Boolean" },
            values: { type: "Function", returnType: "Array" },
        },
    },
    Function: {
        type: "Function",
        returnType: "Function",
    },
    Array: {
        type: "Function",
        returnType: "Array",
        properties: {
            from: { type: "Function", returnType: "Array" },
            of: { type: "Function", returnType: "Array" },
            isArray: { type: "Function", returnType: "Boolean" },
            fromAsync: { type: "Function", returnType: "Promise" },
        },
    },
    Map: {
        type: "Function",
        returnType: "Map",
        properties: {
            groupBy: { type: "Function", returnType: "Map" },
        },
    },
    Set: {
        type: "Function",
        returnType: "Set",
    },
    Iterator: {
        type: "Function",
        returnType: "Iterator",
        properties: {
            from: { type: "Function", returnType: "Iterator" },
        },
    },
    RegExp: { type: "Function", returnType: "RegExp" },
    Date: {
        type: "Function",
        returnType: "Date",
        properties: {
            now: { type: "Function", returnType: "Number" },
            parse: { type: "Function", returnType: "Number" },
            UTC: { type: "Function", returnType: "Number" },
        },
    },
    Promise: {
        type: "Function",
        returnType: "Promise",
        properties: {
            all: { type: "Function", returnType: "Promise" },
            allSettled: { type: "Function", returnType: "Promise" },
            any: { type: "Function", returnType: "Promise" },
            race: { type: "Function", returnType: "Promise" },
            reject: { type: "Function", returnType: "Promise" },
            resolve: { type: "Function", returnType: "Promise" },
            withResolvers: { type: "Function", returnType: "Object" },
        },
    },
    Int8Array: {
        type: "Function",
        returnType: "Int8Array",
        properties: {
            BYTES_PER_ELEMENT: { type: "Number" },
        },
    },
    Uint8Array: {
        type: "Function",
        returnType: "Uint8Array",
        properties: {
            BYTES_PER_ELEMENT: { type: "Number" },
        },
    },
    Uint8ClampedArray: {
        type: "Function",
        returnType: "Uint8ClampedArray",
        properties: {
            BYTES_PER_ELEMENT: { type: "Number" },
        },
    },
    Int16Array: {
        type: "Function",
        returnType: "Int16Array",
        properties: {
            BYTES_PER_ELEMENT: { type: "Number" },
        },
    },
    Uint16Array: {
        type: "Function",
        returnType: "Uint16Array",
        properties: {
            BYTES_PER_ELEMENT: { type: "Number" },
        },
    },
    Int32Array: {
        type: "Function",
        returnType: "Int32Array",
        properties: {
            BYTES_PER_ELEMENT: { type: "Number" },
        },
    },
    Uint32Array: {
        type: "Function",
        returnType: "Uint32Array",
        properties: {
            BYTES_PER_ELEMENT: { type: "Number" },
        },
    },
    Float32Array: {
        type: "Function",
        returnType: "Float32Array",
        properties: {
            BYTES_PER_ELEMENT: { type: "Number" },
        },
    },
    Float64Array: {
        type: "Function",
        returnType: "Float64Array",
        properties: {
            BYTES_PER_ELEMENT: { type: "Number" },
        },
    },
    BigInt64Array: {
        type: "Function",
        returnType: "BigInt64Array",
        properties: {
            BYTES_PER_ELEMENT: { type: "Number" },
        },
    },
    BigUint64Array: {
        type: "Function",
        returnType: "BigUint64Array",
        properties: {
            BYTES_PER_ELEMENT: { type: "Number" },
        },
    },
    ArrayBuffer: {
        type: "Function",
        returnType: "ArrayBuffer",
        properties: {
            isView: { type: "Function", returnType: "Boolean" },
        },
    },
    SharedArrayBuffer: { type: "Function", returnType: "SharedArrayBuffer" },
    Intl: {
        type: "Object",
        properties: {
            Collator: { type: "Function", returnType: "Intl.Collator" },
            DateTimeFormat: {
                type: "Function",
                returnType: "Intl.DateTimeFormat",
            },
            ListFormat: {
                type: "Function",
                returnType: "Intl.ListFormat",
            },
            NumberFormat: {
                type: "Function",
                returnType: "Intl.NumberFormat",
            },
            PluralRules: {
                type: "Function",
                returnType: "Intl.PluralRules",
            },
            RelativeTimeFormat: {
                type: "Function",
                returnType: "Intl.RelativeTimeFormat",
            },
            Segmenter: { type: "Function", returnType: "Intl.Segmenter" },
        },
    },
    undefined: { type: "undefined" },
    NaN: { type: "Number" },
    Infinity: { type: "Number" },
}

/**
 * Build object type checker.
 * @param {RuleContext} context The rule context.
 * @param {boolean} aggressiveResult The value to return if the type cannot be determined.
 * @returns {((memberAccessNode: MemberExpression, className: string) => boolean)} Returns an object type checker.
 */
function buildObjectTypeChecker(context, aggressiveResult) {
    const getType = buildExpressionTypeProvider(context)
    return function (memberAccessNode, className) {
        const type = getType(memberAccessNode.object)
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
 * @returns {((node: Expression) => TypeName | null)} Returns an expression type provider.
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
 * @returns {((node: Expression) => TypeName | null)} Returns an expression type provider.
 */
function buildExpressionTypeProviderImpl(context) {
    /** @type {Record<Expression['type'], (node: Expression) => TypeName | null>} */
    const GET_TYPES = {
        ArrayExpression: () => "Array",
        ObjectExpression: () => "Object",
        ArrowFunctionExpression: () => "Function",
        FunctionExpression: () => "Function",
        Literal: getLiteralType,
        TemplateLiteral: () => "String",
        Identifier: getIdentifierType,
        /** @param {import("estree").BinaryExpression} node */
        BinaryExpression: (node) =>
            getOperatorType(node.operator, node.left, node.right),
        /** @param {import("estree").LogicalExpression} node */
        LogicalExpression: (node) =>
            getOperatorType(node.operator, node.left, node.right),
        /** @param {import("estree").AssignmentExpression} node */
        AssignmentExpression: (node) =>
            getOperatorType(node.operator, node.left, node.right),
        UnaryExpression: getUnaryExpressionType,
        UpdateExpression: () => "Number",
        ClassExpression: () => "Function",
        ChainExpression: (node) => getType(node.expression),
        /** @param {import("estree").SequenceExpression} node */
        SequenceExpression: (node) =>
            getType(node.expressions[node.expressions.length - 1]),
        CallExpression: getCallExpressionType,
        NewExpression: getCallExpressionType,
        TaggedTemplateExpression: getCallExpressionType,
        MemberExpression: getMemberExpressionType,
        /** @param {import("estree").ConditionalExpression} node */
        ConditionalExpression(node) {
            const consequent = getType(node.consequent)
            const alternate = getType(node.alternate)
            return consequent === alternate ? consequent : null
        },
    }

    const tracked = new Map()
    return getType

    /**
     * Gets the type name of the given node.
     * @param {Expression} node The Expression node
     * @returns {TypeName | null} The type name of expression.
     */
    function getType(node) {
        if (tracked.has(node)) {
            return tracked.get(node)
        }
        tracked.set(node, null)
        try {
            const result = GET_TYPES[node.type]?.(node) ?? null
            tracked.set(node, result)
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
     * @returns {TypeName | null}
     */
    function getLiteralType(node) {
        if (node.regex) {
            return "RegExp"
        }
        if (node.bigint) {
            return "BigInt"
        }
        if (node.value == null) {
            return "null"
        }
        const valueType = typeof node.value
        if (valueType === "string") {
            return "String"
        }
        if (valueType === "number") {
            return "Number"
        }
        if (valueType === "boolean") {
            return "Boolean"
        }
        return valueType[0].toUpperCase() + valueType.slice(1)
    }

    /**
     * @param {import("estree").Identifier} node
     * @returns {BasicIdentifierObject | FunctionIdentifierObject | null}
     */
    function getIdentifierObject(node) {
        if (node.type !== "Identifier") {
            return null
        }
        const variable = findVariableFromIdentifier(node)
        if (variable) {
            if (variable.defs.length === 0) {
                // It is a global variable
                return WELLKNOWN_GLOBALS[node.name] ?? null
            } else if (variable.defs.length === 1) {
                const def = variable.defs[0]
                if (def.type === "Variable") {
                    if (
                        // It has an initial value.
                        def.node.init &&
                        // It does not write new values.
                        (def.parent.kind === "const" ||
                            variable.references.every(
                                (ref) =>
                                    ref.isReadOnly() ||
                                    ref.identifier === def.name,
                            ))
                    ) {
                        // The type of the initial value is the type of the variable.
                        const type = getType(def.node.init)
                        return type ? { type } : null
                    }
                } else if (def.type === "FunctionName") {
                    return {
                        type: "Function",
                        returnType:
                            def.node.generator && def.node.async
                                ? null
                                : def.node.generator
                                  ? "Iterator"
                                  : def.node.async
                                    ? "Promise"
                                    : null,
                    }
                }
            }
        }
        return null
    }

    /**
     * @param {import("estree").Identifier} node
     * @returns {TypeName | null}
     */
    function getIdentifierType(node) {
        return getIdentifierObject(node)?.type ?? null
    }

    /**
     * @param {import("estree").BinaryOperator
     *   | import("estree").LogicalOperator
     *   | import("estree").AssignmentOperator} operator
     * @param {import("estree").Expression} leftNode
     * @param {import("estree").Expression} rightNode
     * @returns {TypeName | null}
     */
    // eslint-disable-next-line complexity
    function getOperatorType(operator, leftNode, rightNode) {
        if (operator === "=") {
            return getType(rightNode)
        }
        if (operator === "+" || operator === "+=") {
            return getPlusOperatorType(leftNode, rightNode)
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
            return "Boolean"
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
            const left = getType(leftNode)
            const right = getType(rightNode)
            if (left === "BigInt" || right === "BigInt") {
                return "BigInt"
            }
            return left == null && right == null ? null : "Number"
        }
        if (
            operator === "<<" ||
            operator === "<<=" ||
            operator === ">>" ||
            operator === ">>=" ||
            operator === ">>>" ||
            operator === ">>>="
        ) {
            return "Number"
        }
        if (
            operator === "&&" ||
            operator === "&&=" ||
            operator === "||" ||
            operator === "||=" ||
            operator === "??" ||
            operator === "??="
        ) {
            const left = getType(leftNode)
            const right = getType(rightNode)
            return left === right ? left : null
        }
        return null
    }

    /**
     * @param {import("estree").Expression} leftNode
     * @param {import("estree").Expression} rightNode
     * @returns {TypeName | null}
     */
    function getPlusOperatorType(leftNode, rightNode) {
        const left = getType(leftNode)
        const right = getType(rightNode)
        if (left === "String" || right === "String") {
            return "String"
        }
        if (left === "BigInt" || right === "BigInt") {
            return "BigInt"
        }
        if (right === "Number") {
            return "Number"
        }
        if (left === "Number") {
            if (right === "null" || right === "undefined") {
                return "Number"
            }
        }
        if (right == null) {
            return null
        }
        return "String"
    }

    /**
     * @param {import("estree").UnaryExpression} node
     * @returns {TypeName | null}
     */
    function getUnaryExpressionType(node) {
        if (node.operator === "!" || node.operator === "delete") {
            return "Boolean"
        }
        if (node.operator === "+") {
            return "Number"
        }
        if (node.operator === "-" || node.operator === "~") {
            const argument = getType(node.argument)
            if (argument === "BigInt") {
                return argument
            }
            return argument == null ? null : "Number"
        }
        if (node.operator === "typeof") {
            return "String"
        }
        if (node.operator === "void") {
            return "undefined"
        }
        return null
    }

    /**
     * @param {import("estree").SimpleCallExpression | import("estree").NewExpression | import("estree").TaggedTemplateExpression} node
     * @returns {TypeName | null}
     */
    function getCallExpressionType(node) {
        const callee =
            node.type === "CallExpression" || node.type === "NewExpression"
                ? node.callee
                : node.tag
        if (callee.type === "Identifier") {
            const obj = getIdentifierObject(callee)
            return obj?.type === "Function" ? obj.returnType : null
        } else if (callee.type === "MemberExpression") {
            if (callee.computed || callee.property.type !== "Identifier") {
                return null
            }
            const obj = getIdentifierObject(callee.object)
            if (obj?.properties) {
                const prop = obj.properties[callee.property.name]
                return prop?.type === "Function" ? prop.returnType : null
            }
        }
        return null
    }

    /**
     * @param {import("estree").MemberExpression} node
     * @returns {TypeName | null}
     */
    function getMemberExpressionType(node) {
        if (node.computed || node.property.type !== "Identifier") {
            return null
        }
        const obj = getIdentifierObject(node.object)
        if (obj?.properties) {
            const prop = obj.properties[node.property.name]
            return prop?.type ?? null
        }
        return null
    }
}
