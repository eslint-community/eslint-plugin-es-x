"use strict"

const {
    defineStaticPropertiesHandler,
} = require("../util/define-static-properties-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `Map.groupBy()` method.",
            category: "ES2024",
            proposal: "array-grouping",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-map-groupby.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2024 '{{name}}' is forbidden.",
        },
        schema: [
            {
                type: "object",
                properties: {
                    allowTestedProperty: { type: "boolean" },
                },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        return defineStaticPropertiesHandler(context, {
            Map: { groupBy: "function" },
        })
    },
}
