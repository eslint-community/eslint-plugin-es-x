import { getStaticValue } from "@eslint-community/eslint-utils"
import type { TSESTree } from "@typescript-eslint/types"
import type { Scope } from "eslint"
import type * as ESTree from "estree"

/**
 * Get the property name/symbol from a MemberExpression node or a Property node.
 *
 * The difference from `@eslint-community/eslint-utils.getPropertyName()` is
 * that if key is a Symbol, this function returns a Symbol.
 * @param node The node to get.
 * @param initialScope The scope to start finding variable. Optional. If the node is a computed property node and this scope was given, this checks the computed property name by the `getStringIfConstant` function with the scope, and returns the value of it.
 * @returns The property name/symbol, or null.
 */
export function getPropertyKeyValue(
    node:
        | ESTree.Property
        | ESTree.MemberExpression
        | ESTree.MethodDefinition
        | ESTree.PropertyDefinition
        | TSESTree.Property
        | TSESTree.MemberExpression
        | TSESTree.MethodDefinition
        | TSESTree.PropertyDefinition,
    initialScope?: Scope.Scope | null,
): string | symbol | null {
    switch (node.type) {
        case "MemberExpression":
            if (node.computed) {
                return getStaticKeyValue(node.property, initialScope)
            }
            if (node.property.type === "PrivateIdentifier") {
                return null
            }
            return (node.property as ESTree.Identifier).name

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
            return (node.key as ESTree.Identifier).name

        // no default
    }

    return null
}

/**
 * @param node The node to get.
 * @param initialScope The scope to start finding variable.
 * @returns The static property key value.
 */
function getStaticKeyValue(
    node:
        | ESTree.Expression
        | ESTree.PrivateIdentifier
        | TSESTree.Expression
        | TSESTree.PrivateIdentifier,
    initialScope?: Scope.Scope | null,
): string | symbol | null {
    const value = getStaticValue(node as ESTree.Node, initialScope)
    return (
        value &&
        (typeof value.value === "symbol" ? value.value : String(value.value))
    )
}
