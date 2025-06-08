"use strict"

const {
    defineStaticPropertiesHandler,
} = require("../util/define-static-properties-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `Symbol.matchAll` property",
            category: "ES2020",
            proposal: "string-matchall",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-symbol-matchall.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2020 '{{name}}' property is forbidden.",
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
            Symbol: { matchAll: "symbol" },
        })
    },
}
