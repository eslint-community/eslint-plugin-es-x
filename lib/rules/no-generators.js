/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow generator function declarations.",
            category: "ES2015",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.1.0/docs/rules/no-generators.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2015 generator function declarations are forbidden.",
        },
    },
    create(context) {
        return {
            ":function[generator=true]"(node) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
}
