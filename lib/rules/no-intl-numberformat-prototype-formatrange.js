"use strict"

const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = {
    meta: {
        docs: {
            description:
                "disallow the `NumberFormat.prototype.formatRange` method.",
            category: "ES2023-Intl-API",
            proposal: "intl-numberformat-v3",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-intl-numberformat-prototype-formatrange.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2023 Intl API '{{name}}' method is forbidden.",
        },
        schema: [
            {
                type: "object",
                properties: {
                    aggressive: { type: "boolean" },
                    allowTestedProperty: { type: "boolean" },
                },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        return definePrototypePropertiesHandler(context, {
            "Intl.NumberFormat": { formatRange: "function" },
        })
    },
}
