/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import { createRule } from "../util/create-rule.ts"
import { defineRegExpHandler } from "../util/define-regexp-handler.ts"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow RegExp Unicode property escape sequences.",
            category: "ES2018",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-regexp-unicode-property-escapes.html",
        },
        fixable: null,
        messages: {
            forbidden:
                "ES2018 RegExp Unicode property escape sequences are forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineRegExpHandler(context, (node) => {
            let found = false
            return {
                onUnicodePropertyCharacterSet() {
                    found = true
                },
                onExit() {
                    if (found) {
                        context.report({ node, messageId: "forbidden" })
                    }
                },
            }
        })
    },
})
