/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

/**
 * Check whether a given token is a comma token or not.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the token is a comma token.
 */
function isCommaToken(token) {
    return token != null && token.type === "Punctuator" && token.value === ","
}

module.exports = {
    meta: {
        docs: {
            description: "disallow trailing function commas.",
            category: "ES2017",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.0.0/docs/rules/no-trailing-function-commas.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2017 trailing function commas are forbidden.",
        },
    },
    create(context) {
        const sourceCode = context.getSourceCode()
        return {
            ":function"(node) {
                const length = node.params.length
                if (length === 0) {
                    return
                }

                const lastParam = node.params[length - 1]
                const token = sourceCode.getTokenAfter(lastParam)
                if (isCommaToken(token)) {
                    context.report({ loc: token.loc, messageId: "forbidden" })
                }
            },
            "CallExpression, NewExpression"(node) {
                const token = sourceCode.getLastToken(node, 1)
                if (node.arguments.length >= 1 && isCommaToken(token)) {
                    context.report({ loc: token.loc, messageId: "forbidden" })
                }
            },
        }
    },
}
