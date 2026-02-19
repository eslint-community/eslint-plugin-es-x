"use strict"

const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = {
    meta: {
        docs: {
            description:
                "disallow the `Intl.Locale.prototype.getWeekInfo` method",
            category: "ES2026-Intl-API",
            proposal: "intl-locale-info",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-intl-locale-prototype-getweekinfo.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2026 Intl API '{{name}}' method is forbidden.",
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
            "Intl.Locale": { getWeekInfo: "function" },
        })
    },
}
