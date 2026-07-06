/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import { getRegExpCalls } from "../utils.ts"
import { createRule } from "../util/create-rule.ts"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow RegExp `s` flag.",
            category: "ES2018",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-regexp-s-flag.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2018 RegExp 's' flag is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            "Literal[regex]"(node) {
                if (node.regex.flags.includes("s")) {
                    context.report({ node, messageId: "forbidden" })
                }
            },

            "Program:exit"(program) {
                const sourceCode = context.sourceCode
                const scope = sourceCode.getScope(program)

                for (const { node, flags } of getRegExpCalls(scope)) {
                    if (flags && flags.includes("s")) {
                        context.report({ node, messageId: "forbidden" })
                    }
                }
            },
        }
    },
})
