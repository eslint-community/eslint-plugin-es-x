"use strict"

const { createRule } = require("../util/create-rule")
const {
    defineStaticPropertiesHandler,
} = require("../util/define-static-properties-handler")

module.exports = createRule({
    meta: {
        docs: {
            description: "disallow the `Object.groupBy()` method.",
            category: "ES2024",
            proposal: "array-grouping",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-object-groupby.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2024 '{{name}}' is forbidden.",
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
        return defineStaticPropertiesHandler(context, {
            Object: { groupBy: "function" },
        })
    },
})
