/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow destructuring.",
            category: "ES2015",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.1.0/docs/rules/no-destructuring.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2015 destructuring is forbidden.",
        },
    },
    create(context) {
        return {
            ":matches(:function, AssignmentExpression, VariableDeclarator, :function > :matches(AssignmentPattern, RestElement), ForInStatement, ForOfStatement) > :matches(ArrayPattern, ObjectPattern)"(
                node
            ) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
}
