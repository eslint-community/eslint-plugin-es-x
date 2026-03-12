"use strict"

const { createRule } = require("../util/create-rule")
const {
    defineStaticPropertiesHandler,
} = require("../util/define-static-properties-handler")

module.exports = createRule({
    meta: {
        docs: {
            description: "disallow the `JSON.rawJSON` method",
            category: "ES2026",
            proposal: "json-parse-with-source",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-json-rawjson.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2026 '{{name}}' method is forbidden.",
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
            JSON: { rawJSON: "function" },
        })
    },
})
