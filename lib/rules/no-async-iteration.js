/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow async iteration.",
            category: "ES2018",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/docs/rules/no-async-iteration.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2018 async iteration is forbidden.",
        },
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
}
