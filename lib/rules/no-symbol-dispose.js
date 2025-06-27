"use strict"

const {
    defineStaticPropertiesHandler,
} = require("../util/define-static-properties-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `Symbol.dispose` property",
            category: "ES2026",
            proposal: "explicit-resource-management",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-symbol-dispose.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2026 '{{name}}' property is forbidden.",
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
            Symbol: { dispose: "symbol" },
        })
    },
}
