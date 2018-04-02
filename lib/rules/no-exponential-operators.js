/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow exponential operators.",
            category: "ES2016",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.0.0/docs/rules/no-exponential-operators.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2016 exponential operators are forbidden.",
        },
    },
    create(context) {
        return {
            "AssignmentExpression[operator='**='], BinaryExpression[operator='**']"(
                node
            ) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
}
