/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { getRegExpCalls } = require("../utils")

module.exports = {
    meta: {
        docs: {
            description: "disallow RegExp `s` flag.",
            category: "ES2018",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.1.0/docs/rules/no-regexp-s-flag.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2018 RegExp 's' flag is forbidden.",
        },
    },
    create(context) {
        return {
            "Literal[regex]"(node) {
                if (node.regex.flags.includes("s")) {
                    context.report({ node, messageId: "forbidden" })
                }
            },

            "Program:exit"() {
                const scope = context.getScope()

                for (const { node, flags } of getRegExpCalls(scope)) {
                    if (flags && flags.includes("s")) {
                        context.report({ node, messageId: "forbidden" })
                    }
                }
            },
        }
    },
}
