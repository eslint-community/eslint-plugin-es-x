/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { definePatternMatcher, getRegExpCalls } = require("../utils")
const hasUnicodePropertyEscape = definePatternMatcher(/\\[pP]\{.+?\}/g)

module.exports = {
    meta: {
        docs: {
            description: "disallow RegExp Unicode property escape sequences.",
            category: "ES2018",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.1.0/docs/rules/no-regexp-unicode-property-escapes.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden:
                "ES2018 RegExp Unicode property escape sequences are forbidden.",
        },
    },
    create(context) {
        return {
            "Literal[regex]"(node) {
                if (
                    node.regex.flags.includes("u") &&
                    hasUnicodePropertyEscape(node.regex.pattern)
                ) {
                    context.report({ node, messageId: "forbidden" })
                }
            },

            "Program:exit"() {
                const scope = context.getScope()

                for (const { node, pattern, flags } of getRegExpCalls(scope)) {
                    if (
                        flags &&
                        pattern &&
                        flags.includes("u") &&
                        hasUnicodePropertyEscape(pattern)
                    ) {
                        context.report({ node, messageId: "forbidden" })
                    }
                }
            },
        }
    },
}
