"use strict"

const {
    defineNonstandardPrototypePropertiesHandler,
} = require("../util/define-nonstandard-prototype-properties-handler")
const {
    temporalDurationPrototypeProperties,
} = require("../util/well-known-properties")

module.exports = {
    meta: {
        docs: {
            description:
                "disallow non-standard properties on Temporal.Duration instance",
            category: "nonstandard",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-nonstandard-temporal-duration-prototype-properties.html",
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
            ...temporalDurationPrototypeProperties,
        ])
        return defineNonstandardPrototypePropertiesHandler(context, {
            "Temporal.Duration": allows,
        })
    },
}
