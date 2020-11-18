/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { READ, ReferenceTracker } = require("eslint-utils")

module.exports = {
    meta: {
        docs: {
            description: "disallow `Promise.any` function",
            category: "ES2021",
            recommended: false,
            url:
                "http://mysticatea.github.io/eslint-plugin-es/rules/no-promise-any.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2021 'Promise.any' function is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            "Program:exit"() {
                const tracker = new ReferenceTracker(context.getScope())
                for (const { node } of tracker.iterateGlobalReferences({
                    Promise: { any: { [READ]: true } },
                })) {
                    context.report({ node, messageId: "forbidden" })
                }
            },
        }
    },
}
