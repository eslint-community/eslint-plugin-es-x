"use strict"

const {
    defineNonstandardStaticPropertiesHandler,
} = require("../util/define-nonstandard-static-properties-handler")
const {
    asyncDisposableStackProperties,
} = require("../util/well-known-properties")

module.exports = {
    meta: {
        docs: {
            description:
                "disallow non-standard static properties on `AsyncDisposableStack` class",
            category: "nonstandard",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-nonstandard-asyncdisposablestack-properties.html",
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
                    allowTestedProperty: { type: "boolean" },
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
            ...asyncDisposableStackProperties,
        ])
        return defineNonstandardStaticPropertiesHandler(context, {
            AsyncDisposableStack: allows,
        })
    },
}
