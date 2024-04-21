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
            description: "disallow private class methods.",
            category: "ES2022",
            proposal: "class-fields",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-class-private-methods.html",
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
            "MethodDefinition:exit"(node) {
                if (node.key.type !== "PrivateIdentifier") {
                    return
                }
                context.report({
                    node: node.key,
                    messageId: "forbidden",
                    data: {
                        nameWithKind: [
                            "private method",
                            getFieldName(node, getSourceCode(context)),
                        ]
                            .filter(Boolean)
                            .join(" "),
                    },
                })
            },
        }
    },
}
