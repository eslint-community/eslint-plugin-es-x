/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const Pattern = /^0[bB]/

module.exports = {
    meta: {
        docs: {
            description: "disallow binary numeric literals.",
            category: "ES2015",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.1.0/docs/rules/no-binary-numeric-literals.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2015 binary numeric literals are forbidden.",
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
