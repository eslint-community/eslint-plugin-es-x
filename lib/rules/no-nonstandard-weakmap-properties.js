"use strict"

const {
    defineNonstandardStaticPropertiesHandler,
} = require("../util/define-nonstandard-static-properties-handler")
const { weakMapProperties } = require("../util/well-known-properties")

module.exports = {
    meta: {
        docs: {
            description:
                "disallow non-standard static properties on `WeakMap` class",
            category: "nonstandard",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-nonstandard-weakmap-properties.html",
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
            ...weakMapProperties,
        ])
        return defineNonstandardStaticPropertiesHandler(context, {
            WeakMap: allows,
        })
    },
}