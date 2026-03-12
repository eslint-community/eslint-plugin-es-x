"use strict"

const { createRule } = require("../util/create-rule")
const {
    defineNonstandardPrototypePropertiesHandler,
} = require("../util/define-nonstandard-prototype-properties-handler")
const { booleanPrototypeProperties } = require("../util/well-known-properties")

module.exports = createRule({
    meta: {
        docs: {
            description: "disallow non-standard properties on Boolean instance",
            category: "nonstandard",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-nonstandard-boolean-prototype-properties.html",
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
            ...booleanPrototypeProperties,
        ])
        return defineNonstandardPrototypePropertiesHandler(context, {
            Boolean: allows,
        })
    },
})
