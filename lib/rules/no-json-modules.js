"use strict"

const {
    getPropertyName,
    findVariable,
    getStaticValue,
} = require("@eslint-community/eslint-utils")

/**
 * @typedef {import('estree').ImportAttribute} ImportAttribute
 * @typedef {import('estree').Expression} Expression
 * @typedef {import('estree').Property} Property
 */

/**
 * Get the attribute name from a ImportAttribute node.
 * @param {ImportAttribute} node The node to get.
 * @returns {string|null} The attribute name of the node.
 */
function getAttributeName(node) {
    if (node.key.type === "Literal") {
        return String(node.key.value)
    }
    return node.key.name
}

module.exports = {
    meta: {
        docs: {
            description: "disallow JSON Modules.",
            category: "ES2025",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-json-modules.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2025 JSON Modules are forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        const sourceCode = context.sourceCode

        function findProperty(node, name) {
            for (const prop of node.properties) {
                if (prop.type !== "Property") {
                    continue
                }
                if (getPropertyName(prop, sourceCode.getScope(node)) === name) {
                    return prop
                }
            }
            return null
        }

        function findVariableInit(node) {
            /** @type {Variable} */
            const variable = findVariable(sourceCode.getScope(node), node)
            const def = variable?.defs[0]
            if (!def) {
                return null
            }
            if (def.type !== "Variable" || !def.node.init) {
                return null
            }
            return def.node.init
        }

        /**
         * @param {Expression} optionsNode
         * @returns {Property|null}
         */
        function findImportAttributeFromOptions(optionsNode) {
            const traversed = new Set()
            return find(optionsNode)

            /** @param {Expression} node  */
            function find(node) {
                if (traversed.has(node)) {
                    return null
                }
                traversed.add(node)
                if (node.type === "ObjectExpression") {
                    return findProperty(node, "with")
                }
                if (node.type === "Identifier") {
                    const init = findVariableInit(node)
                    return init && find(init)
                }
                return null
            }
        }

        /**
         * @param {Expression} optionsNode
         * @returns {Property|null}
         */
        function findImportTypeAttributeFromOptions(optionsNode) {
            const attributes = findImportAttributeFromOptions(optionsNode)
            if (!attributes) {
                return null
            }
            const traversed = new Set()
            return find(attributes.value)

            /** @param {Expression} node  */
            function find(node) {
                if (traversed.has(node)) {
                    return null
                }
                traversed.add(node)
                if (node.type === "ObjectExpression") {
                    return findProperty(node, "type")
                }
                if (node.type === "Identifier") {
                    const init = findVariableInit(node)
                    return init && find(init)
                }
                return null
            }
        }

        return {
            /** @param {ImportAttribute} node */
            ImportAttribute(node) {
                if (
                    getAttributeName(node) === "type" &&
                    node.value.value === "json"
                ) {
                    context.report({ node, messageId: "forbidden" })
                }
            },
            ImportExpression(node) {
                if (!node.options) {
                    return
                }

                const attribute = findImportTypeAttributeFromOptions(
                    node.options,
                )
                if (!attribute) {
                    return
                }
                if (
                    getStaticValue(
                        attribute.value,
                        sourceCode.getScope(attribute.value),
                    )?.value === "json"
                ) {
                    context.report({
                        node: attribute,
                        messageId: "forbidden",
                    })
                }
            },
        }
    },
}
