"use strict"

const {
    defineNonstandardPrototypePropertiesHandler,
} = require("../util/define-nonstandard-prototype-properties-handler")
const {
    intlRelativeTimeFormatPrototypeProperties,
} = require("../util/well-known-properties")

module.exports = {
    meta: {
        docs: {
            description:
                "disallow non-standard properties on Intl.RelativeTimeFormat instance",
            category: "nonstandard",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-nonstandard-intl-relativetimeformat-prototype-properties.html",
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
            ...intlRelativeTimeFormatPrototypeProperties,
        ])
        return defineNonstandardPrototypePropertiesHandler(context, {
            "Intl.RelativeTimeFormat": allows,
        })
    },
}
