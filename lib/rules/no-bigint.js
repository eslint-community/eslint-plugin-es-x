/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { mergeVisitors } = require("../util/merge-visitors")
const { defineGlobalsHandler } = require("../util/define-globals-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow `bigint` syntax and built-ins",
            category: "ES2020",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-bigint.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2020 BigInt is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return mergeVisitors(
            {
                Literal(node) {
                    if (node.bigint != null) {
                        context.report({ messageId: "forbidden", node })
                    }
                },
            },
            defineGlobalsHandler(context, [
                "BigInt",
                "BigInt64Array",
                "BigUint64Array",
            ]),
        )
    },
}
