"use strict"

module.exports = { checkExpressionNodeType }

/**
 * @typedef {import("estree").Expression} Expression
 * @typedef {import("estree").Super} Super
 */
/**
 * Check if the type of the given node is given class or not.
 * @param {Expression | Super} node The expression node.
 * @param {string} className The class name to disallow.
 * @returns {boolean | null} `true` if should disallow it.
 */
function checkExpressionNodeType(node, className) {
    // If it's obvious, shortcut.
    if (node.type === "ArrayExpression") {
        return className === "Array"
    }
    if (node.type === "Literal") {
        if (node.regex) {
            return className === "RegExp"
        }
        if (node.bigint) {
            return className === "BigInt"
        }
        if (typeof node.value === "string") {
            return className === "String"
        }
        if (typeof node.value === "number") {
            return className === "Number"
        }
        if (typeof node.value === "boolean") {
            return className === "Boolean"
        }
        return false
    }
    if (node.type === "TemplateLiteral") {
        return className === "String"
    }
    if (
        node.type === "FunctionExpression" ||
        node.type === "ArrowFunctionExpression" ||
        node.type === "ClassExpression"
    ) {
        return className === "Function"
    }
    if (node.type === "UpdateExpression") {
        return className === "Number"
    }

    return null
}
