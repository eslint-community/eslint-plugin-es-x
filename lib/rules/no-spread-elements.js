/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow spread elements.",
            category: "ES2015",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/docs/rules/no-spread-elements.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2015 spread elements are forbidden.",
        },
    },
    create(context) {
        return {
            ":matches(ArrayExpression, CallExpression, NewExpression) > SpreadElement"(
                node
            ) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
}
