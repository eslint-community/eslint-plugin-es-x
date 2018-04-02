/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow arrow function expressions.",
            category: "ES2015",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.0.0/docs/rules/no-arrow-functions.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2015 arrow function expressions are forbidden.",
        },
    },
    create(context) {
        return {
            ArrowFunctionExpression(node) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
}
