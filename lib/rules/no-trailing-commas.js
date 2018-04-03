/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { isCommaToken } = require("../utils")

module.exports = {
    meta: {
        docs: {
            description: "disallow trailing commas in array/object literals.",
            category: "ES5",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.1.0/docs/rules/no-trailing-commas.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden:
                "ES5 trailing commas in array/object literals are forbidden.",
        },
    },
    create(context) {
        const sourceCode = context.getSourceCode()
        return {
            "ArrayExpression, ArrayPattern, ObjectExpression, ObjectPattern"(
                node
            ) {
                const token = sourceCode.getLastToken(node, 1)
                if (isCommaToken(token)) {
                    context.report({ node, messageId: "forbidden" })
                }
            },
        }
    },
}
