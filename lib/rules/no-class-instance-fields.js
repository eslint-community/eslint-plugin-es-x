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
            description: "disallow instance class fields.",
            category: "ES2022",
            proposal: "class-fields",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-class-instance-fields.html",
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
                if (node.static) {
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
                            "instance field",
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
