"use strict"

const {
    defineStaticPropertiesHandler,
} = require("../util/define-static-properties-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `Intl.getCanonicalLocales` method.",
            category: "ES2016-Intl-API",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-intl-getcanonicallocales.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2016 Intl API '{{name}}' method is forbidden.",
        },
        schema: [
            {
                type: "object",
                properties: {
                    allowTestedProperty: { type: "boolean" },
                },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        return defineStaticPropertiesHandler(context, {
            Intl: { getCanonicalLocales: "function" },
        })
    },
}
