/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow block-scoped function declarations.",
            category: "ES2015",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/docs/rules/no-block-scoped-functions.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2015 block-scoped functions are forbidden.",
        },
    },
    create(context) {
        return {
            ":not(:function) > BlockStatement > FunctionDeclaration"(node) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
}
