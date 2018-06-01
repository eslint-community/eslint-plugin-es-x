/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow optional `catch` binding.",
            category: "ES2019",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/docs/rules/no-optional-catch-binding.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2019 optional 'catch' binding is forbidden.",
        },
    },
    create(context) {
        return {
            "CatchClause[param=null]"(node) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
}