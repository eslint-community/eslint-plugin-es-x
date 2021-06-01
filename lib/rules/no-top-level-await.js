/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow top-level `await`.",
            category: "ES2022",
            recommended: false,
            url:
                "http://mysticatea.github.io/eslint-plugin-es/rules/no-top-level-await.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2022 top-level 'await' is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        let inFunction = null
        return {
            ":function"(node) {
                inFunction = node
            },
            ":function:exit"(node) {
                if (inFunction === node) {
                    inFunction = null
                }
            },
            "AwaitExpression, ForOfStatement[await=true]"(node) {
                if (inFunction) {
                    // not top-level
                    return
                }
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
}
