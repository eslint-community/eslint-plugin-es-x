"use strict"

const {
    findVariable,
    getPropertyName,
} = require("@eslint-community/eslint-utils")

/**
 * @typedef {import("estree").Expression} Expression
 * @typedef {import("eslint").Scope.Variable} Variable
 */

module.exports = {
    meta: {
        docs: {
            description: "disallow Import Attributes.",
            category: "ES2025",
            recommended: false,
            proposal: "import-attributes",
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-import-attributes.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2025 Import Attributes are forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        const sourceCode = context.sourceCode

        /** @param {Expression} optionsNode  */
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
                    for (const prop of node.properties) {
                        if (prop.type !== "Property") {
                            continue
                        }
                        if (
                            getPropertyName(prop, sourceCode.getScope(node)) ===
                            "with"
                        ) {
                            return prop
                        }
                    }
                }
                if (node.type === "Identifier") {
                    /** @type {Variable} */
                    const variable = findVariable(
                        sourceCode.getScope(node),
                        node,
                    )
                    const def = variable?.defs[0]
                    if (!def) {
                        return null
                    }
                    if (def.type !== "Variable" || !def.node.init) {
                        return null
                    }
                    return find(def.node.init)
                }
                return null
            }
        }

        return {
            ImportAttribute(node) {
                context.report({ node, messageId: "forbidden" })
            },
            ImportExpression(node) {
                if (!node.options) {
                    return
                }

                const attributes = findImportAttributeFromOptions(node.options)
                if (attributes) {
                    context.report({
                        node: attributes,
                        messageId: "forbidden",
                    })
                }
            },
        }
    },
}
