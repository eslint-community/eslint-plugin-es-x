/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import { getRegExpCalls } from "../utils"
import { createRule } from "../util/create-rule"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow RegExp `u` flag.",
            category: "ES2015",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-regexp-u-flag.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2015 RegExp 'u' flag is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            "Literal[regex]"(node) {
                if (node.regex.flags.includes("u")) {
                    context.report({ node, messageId: "forbidden" })
                }
            },

            "Program:exit"(program) {
                const sourceCode = context.sourceCode
                const scope = sourceCode.getScope(program)

                for (const { node, flags } of getRegExpCalls(scope)) {
                    if (flags && flags.includes("u")) {
                        context.report({ node, messageId: "forbidden" })
                    }
                }
            },
        }
    },
})
