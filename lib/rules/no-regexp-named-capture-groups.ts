/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import { createRule } from "../util/create-rule.ts"
import { defineRegExpHandler } from "../util/define-regexp-handler.ts"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow RegExp named capture groups.",
            category: "ES2018",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-regexp-named-capture-groups.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2018 RegExp named capture groups are forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineRegExpHandler(context, (node) => {
            let found = false
            return {
                onCapturingGroupEnter(_start, name) {
                    if (name) {
                        found = true
                    }
                },
                onBackreference(_start, _end, ref) {
                    if (typeof ref === "string") {
                        found = true
                    }
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
