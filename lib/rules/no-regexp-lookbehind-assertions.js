/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { definePatternMatcher, getRegExpCalls } = require("../utils")
const hasLookbehindAssertion = definePatternMatcher(/\(\?<[=!]/g)

module.exports = {
    meta: {
        docs: {
            description: "disallow RegExp lookbehind assertions.",
            category: "ES2018",
            recommended: false,
            url:
                "http://mysticatea.github.io/eslint-plugin-es/rules/no-regexp-lookbehind-assertions.html",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2018 RegExp lookbehind assertions are forbidden.",
        },
    },
    create(context) {
        return {
            "Literal[regex]"(node) {
                if (hasLookbehindAssertion(node.regex.pattern)) {
                    context.report({ node, messageId: "forbidden" })
                }
            },

            "Program:exit"() {
                const scope = context.getScope()

                for (const { node, pattern } of getRegExpCalls(scope)) {
                    if (pattern && hasLookbehindAssertion(pattern)) {
                        context.report({ node, messageId: "forbidden" })
                    }
                }
            },
        }
    },
}
