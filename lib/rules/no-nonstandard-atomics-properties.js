"use strict"

const {
    defineNonstandardPropertiesHandler,
} = require("../util/define-nonstandard-properties-handler")
const { atomicsProperties } = require("../util/well-known-properties")

module.exports = {
    meta: {
        docs: {
            description: "disallow non-standard properties on `Atomics` class",
            category: "nonstandard",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-nonstandard-atomics-properties.html",
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
            ...atomicsProperties,
        ])
        return defineNonstandardPropertiesHandler(context, "Atomics", allows)
    },
}
