/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow async function declarations.",
            category: "ES2017",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/docs/rules/no-async-functions.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2017 async function declarations are forbidden.",
        },
    },
    create(context) {
        return {
            ":function[async=true]"(node) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
}
