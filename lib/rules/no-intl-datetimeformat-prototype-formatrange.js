"use strict"

const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = {
    meta: {
        docs: {
            description:
                "disallow the `Intl.DateTimeFormat.prototype.formatRange` method.",
            category: "ES2021-Intl-API",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-intl-datetimeformat-prototype-formatrange.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2021 Intl API '{{name}}' method is forbidden.",
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
            "Intl.DateTimeFormat": { formatRange: "function" },
        })
    },
}
