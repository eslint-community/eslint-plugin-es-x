"use strict"

const { getStaticValue } = require("@eslint-community/eslint-utils")

/**
 * @typedef {import('estree').Property} Property
 * @typedef {import('estree').MemberExpression} MemberExpression
 * @typedef {import('estree').Expression} Expression
 * @typedef {import('estree').PrivateIdentifier} PrivateIdentifier
 * @typedef {import('eslint').Scope.Scope} Scope
 */
/**
 * Get the property name/symbol from a MemberExpression node or a Property node.
 *
 * The difference from `@eslint-community/eslint-utils.getPropertyName()` is
 * that if key is a Symbol, this function returns a Symbol.
 * @param {Property|MemberExpression} node The node to get.
 * @param {Scope} [initialScope] The scope to start finding variable. Optional. If the node is a computed property node and this scope was given, this checks the computed property name by the `getStringIfConstant` function with the scope, and returns the value of it.
 * @returns {string|symbol|null}
 */
function getPropertyKeyValue(node, initialScope) {
    switch (node.type) {
        case "MemberExpression":
            if (node.computed) {
                return getStaticKeyValue(node.property, initialScope)
            }
            if (node.property.type === "PrivateIdentifier") {
                return null
            }
            return node.property.name

        case "Property":
        case "MethodDefinition":
        case "PropertyDefinition":
            if (node.computed) {
                return getStaticKeyValue(node.key, initialScope)
            }
            if (node.key.type === "Literal") {
                return String(node.key.value)
            }
            if (node.key.type === "PrivateIdentifier") {
                return null
            }
            return node.key.name

        // no default
    }

    return null
}

/**
 * @param {Expression|PrivateIdentifier} node
 * @param {Scope} initialScope
 */
function getStaticKeyValue(node, initialScope) {
    const value = getStaticValue(node, initialScope)
    return (
        value &&
        (typeof value.value === "symbol" ? value.value : String(value.value))
    )
}

module.exports = { getPropertyKeyValue }
