/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description:
                "disallow `super` property accesses in object literals.",
            category: "ES2015",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.1.0/docs/rules/no-object-super-properties.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden:
                "ES2015 'super' property accesses in object literals are forbidden.",
        },
    },
    create(context) {
        let stack = null

        return {
            Super(node) {
                if (stack && stack.inObjectMethod) {
                    context.report({ node, messageId: "forbidden" })
                }
            },

            ":matches(FunctionExpression, FunctionDeclaration)"(node) {
                const { type, method } = node.parent
                stack = {
                    inObjectMethod: type === "Property" && method === true,
                    upper: stack,
                }
            },
            ":matches(FunctionExpression, FunctionDeclaration):exit"() {
                stack = stack.upper
            },
        }
    },
}
