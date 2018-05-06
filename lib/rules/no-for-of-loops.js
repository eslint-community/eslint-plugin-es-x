/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow `for-of` statements.",
            category: "ES2015",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/docs/rules/no-for-of-loops.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2015 'for-of' statements are forbidden.",
        },
    },
    create(context) {
        return {
            ForOfStatement(node) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
}
