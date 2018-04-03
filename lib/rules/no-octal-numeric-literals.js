/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const Pattern = /^0[oO]/

module.exports = {
    meta: {
        docs: {
            description: "disallow octal numeric literals.",
            category: "ES2015",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.1.0/docs/rules/no-octal-numeric-literals.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2015 octal numeric literals are forbidden.",
        },
    },
    create(context) {
        return {
            Literal(node) {
                if (typeof node.value === "number" && Pattern.test(node.raw)) {
                    context.report({ node, messageId: "forbidden" })
                }
            },
        }
    },
}
