/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { definePatternMatcher, getRegExpCalls } = require("../utils")
const hasNamedCaptureGroup = definePatternMatcher(/\(\?<[_$\w]/g)

module.exports = {
    meta: {
        docs: {
            description: "disallow RegExp named capture groups.",
            category: "ES2018",
            recommended: false,
            url:
                "http://mysticatea.github.io/eslint-plugin-es/rules/no-regexp-named-capture-groups.html",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2018 RegExp named capture groups are forbidden.",
        },
    },
    create(context) {
        return {
            "Literal[regex]"(node) {
                if (hasNamedCaptureGroup(node.regex.pattern)) {
                    context.report({ node, messageId: "forbidden" })
                }
            },

            "Program:exit"() {
                const scope = context.getScope()

                for (const { node, pattern } of getRegExpCalls(scope)) {
                    if (pattern && hasNamedCaptureGroup(pattern)) {
                        context.report({ node, messageId: "forbidden" })
                    }
                }
            },
        }
    },
}
