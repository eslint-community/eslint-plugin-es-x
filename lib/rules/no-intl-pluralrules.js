"use strict"

const { createRule } = require("../util/create-rule")
const {
    defineStaticPropertiesHandler,
} = require("../util/define-static-properties-handler")

module.exports = createRule({
    meta: {
        docs: {
            description: "disallow the `Intl.PluralRules` object.",
            category: "ES2018-Intl-API",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-intl-pluralrules.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2018 Intl API '{{name}}' object is forbidden.",
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
            Intl: { PluralRules: "function" },
        })
    },
})
