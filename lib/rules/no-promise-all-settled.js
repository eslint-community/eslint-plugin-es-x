/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { READ, ReferenceTracker } = require("@eslint-community/eslint-utils")
const { getSourceCode } = require("eslint-compat-utils")

module.exports = {
    meta: {
        docs: {
            description: "disallow `Promise.allSettled` function",
            category: "ES2020",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-promise-all-settled.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2020 'Promise.allSettled' function is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            "Program:exit"(program) {
                const sourceCode = getSourceCode(context)
                const tracker = new ReferenceTracker(
                    sourceCode.getScope(program),
                )
                for (const { node } of tracker.iterateGlobalReferences({
                    Promise: { allSettled: { [READ]: true } },
                })) {
                    context.report({ node, messageId: "forbidden" })
                }
            },
        }
    },
}
