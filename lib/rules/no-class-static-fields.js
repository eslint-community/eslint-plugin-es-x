/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { getFieldName } = require("../utils")

module.exports = {
    meta: {
        docs: {
            description: "disallow static class fields.",
            category: "ES2022",
            proposal: "class-fields",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-class-static-fields.html",
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
            PropertyDefinition(node) {
                if (!node.static) {
                    return
                }
                if (node.declare || node.parent.parent.declare) {
                    return
                }
                context.report({
                    node: node.key,
                    messageId: "forbidden",
                    data: {
                        nameWithKind: [
                            "static field",
                            getFieldName(node, context.sourceCode),
                        ]
                            .filter(Boolean)
                            .join(" "),
                    },
                })
            },
        }
    },
}
