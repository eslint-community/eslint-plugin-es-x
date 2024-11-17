"use strict"

const {
    defineNonstandardPropertiesHandler,
} = require("../util/define-nonstandard-properties-handler")
const { jsonProperties } = require("../util/well-known-properties")

module.exports = {
    meta: {
        docs: {
            description: "disallow non-standard properties on `JSON` class",
            category: "nonstandard",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-nonstandard-json-properties.html",
        },
        fixable: null,
        messages: {
            forbidden: "Non-standard '{{name}}' property is forbidden.",
        },
        schema: [
            {
                type: "object",
                properties: {
                    allow: {
                        type: "array",
                        items: { type: "string" },
                        uniqueItems: true,
                    },
                },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        /** @type {Set<string>} */
        const allows = new Set([
            ...(context.options[0]?.allow || []),
            ...jsonProperties,
        ])
        return defineNonstandardPropertiesHandler(context, "JSON", allows)
    },
}
