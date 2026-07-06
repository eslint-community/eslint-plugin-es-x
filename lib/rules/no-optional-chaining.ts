/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
import { createRule } from "../util/create-rule"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow optional chaining.",
            category: "ES2020",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-optional-chaining.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2020 optional chaining is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        const sourceCode = context.sourceCode

        /**
         * Checks if the given token is a `?.` token or not.
         * @param {Token} token The token to check.
         * @returns {boolean} `true` if the token is a `?.` token.
         */
        function isQuestionDotToken(token) {
            return token.value === "?." && token.type === "Punctuator"
        }

        return {
            "CallExpression[optional=true]"(node) {
                context.report({
                    node: sourceCode.getTokenAfter(
                        node.callee,
                        isQuestionDotToken,
                    ),
                    messageId: "forbidden",
                })
            },
            "MemberExpression[optional=true]"(node) {
                context.report({
                    node: sourceCode.getTokenAfter(
                        node.object,
                        isQuestionDotToken,
                    ),
                    messageId: "forbidden",
                })
            },
        }
    },
})
