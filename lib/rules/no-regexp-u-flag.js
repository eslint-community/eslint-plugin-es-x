/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { getRegExpCalls } = require("../utils")

module.exports = {
    meta: {
        docs: {
            description: "disallow RegExp `u` flag.",
            category: "ES2015",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.1.0/docs/rules/no-regexp-u-flag.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2015 RegExp 'u' flag is forbidden.",
        },
    },
    create(context) {
        return {
            "Literal[regex]"(node) {
                if (node.regex.flags.includes("u")) {
                    context.report({ node, messageId: "forbidden" })
                }
            },

            "Program:exit"() {
                const scope = context.getScope()

                for (const { node, flags } of getRegExpCalls(scope)) {
                    if (flags && flags.includes("u")) {
                        context.report({ node, messageId: "forbidden" })
                    }
                }
            },
        }
    },
}
