/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { getFunctionNameWithKind, getPropertyName } = require("eslint-utils")

/**
 * Get the name and kind of the given PropertyDefinition node.
 * @param {PropertyDefinition} node - The PropertyDefinition node to get.
 * @returns {string} The name and kind of the PropertyDefinition node.
 */
function getFieldNameWithKind(node) {
    const tokens = []
    let privateName = null
    if (node.key.type === "PrivateIdentifier") {
        privateName = `#${node.key.name}`
        tokens.push("private")
    }
    if (node.static) {
        tokens.push("static")
    }

    tokens.push("field")

    const name = privateName || getPropertyName(node)

    if (name) {
        tokens.push(`'${name}'`)
    }

    return tokens.join(" ")
}

module.exports = {
    meta: {
        docs: {
            description: "disallow class fields.",
            category: "ES2022",
            recommended: false,
            url:
                "http://mysticatea.github.io/eslint-plugin-es/rules/no-class-fields.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2020 {{nameWithKind}} is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            "MethodDefinition, PropertyDefinition"(node) {
                if (node.type === "PropertyDefinition") {
                    context.report({
                        node: node.key,
                        messageId: "forbidden",
                        data: {
                            nameWithKind: getFieldNameWithKind(node),
                        },
                    })
                } else if (
                    // node.type==='MethodDefinition' &&
                    node.key.type === "PrivateIdentifier"
                ) {
                    context.report({
                        node: node.key,
                        messageId: "forbidden",
                        data: {
                            nameWithKind: getFunctionNameWithKind(node.value),
                        },
                    })
                }
            },
            PrivateIdentifier(node) {
                const parent = node.parent
                if (
                    parent.type === "MethodDefinition" ||
                    parent.type === "PropertyDefinition"
                ) {
                    return
                }

                context.report({
                    node,
                    messageId: "forbidden",
                    data: {
                        nameWithKind:
                            parent.parent.type === "CallExpression" &&
                            parent.parent.callee === parent
                                ? `private method call '#${node.name}()'`
                                : `private access '#${node.name}'`,
                    },
                })
            },
        }
    },
}
