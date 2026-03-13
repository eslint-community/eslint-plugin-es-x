/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { createRule } = require("../util/create-rule")
const { mergeVisitors } = require("../util/merge-visitors")
const { defineGlobalsHandler } = require("../util/define-globals-handler")
const {
    defineStaticPropertiesHandler,
} = require("../util/define-static-properties-handler")

module.exports = createRule({
    meta: {
        docs: {
            description:
                "disallow `Promise.any` function and `AggregateError` class",
            category: "ES2021",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-promise-any.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2021 '{{name}}' is forbidden.",
        },
        schema: [
            {
                type: "object",
                properties: { allowTestedProperty: { type: "boolean" } },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        return mergeVisitors(
            defineStaticPropertiesHandler(context, {
                Promise: { any: "function" },
            }),
            defineGlobalsHandler(context, ["AggregateError"]),
        )
    },
})
