/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import { createRule } from "../util/create-rule.ts"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow async iteration.",
            category: "ES2018",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-async-iteration.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2018 async iteration is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            ":function[async=true][generator=true]"(node) {
                context.report({ node, messageId: "forbidden" })
            },
            "ForOfStatement[await=true]"(node) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
})
