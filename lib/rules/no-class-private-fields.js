/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { getSourceCode } = require("eslint-compat-utils")
const { getFieldName } = require("../utils")

module.exports = {
    meta: {
        docs: {
            description: "disallow private class fields.",
            category: "ES2022",
            proposal: "class-fields",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-class-private-fields.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2022 {{nameWithKind}} is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            PrivateIdentifier(node) {
                /** @type {import('estree').Node} */
                const parent = node.parent
                if (parent.type === "MethodDefinition" && parent.key === node) {
                    return
                }
                if (
                    parent.type === "PropertyDefinition" &&
                    parent.key === node
                ) {
                    if (parent.declare || parent.parent.parent.declare) {
                        return
                    }
                    context.report({
                        node,
                        messageId: "forbidden",
                        data: {
                            nameWithKind: [
                                "private field",
                                getFieldName(parent, getSourceCode(context)),
                            ]
                                .filter(Boolean)
                                .join(" "),
                        },
                    })
                } else {
                    context.report({
                        node,
                        messageId: "forbidden",
                        data: {
                            nameWithKind:
                                parent.parent.type === "CallExpression" &&
                                parent.parent.callee === parent
                                    ? `private method call #${node.name}()`
                                    : `private access #${node.name}`,
                        },
                    })
                }
            },
        }
    },
}
