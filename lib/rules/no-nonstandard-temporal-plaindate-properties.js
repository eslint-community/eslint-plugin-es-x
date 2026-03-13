"use strict"

const { createRule } = require("../util/create-rule")
const {
    defineNonstandardStaticPropertiesHandler,
} = require("../util/define-nonstandard-static-properties-handler")
const { temporalPlainDateProperties } = require("../util/well-known-properties")

module.exports = createRule({
    meta: {
        docs: {
            description:
                "disallow non-standard static properties on `Temporal.PlainDate` class",
            category: "nonstandard",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-nonstandard-temporal-plaindate-properties.html",
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
            ...temporalPlainDateProperties,
        ])
        return defineNonstandardStaticPropertiesHandler(context, {
            "Temporal.PlainDate": allows,
        })
    },
})
