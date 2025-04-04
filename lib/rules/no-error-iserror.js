"use strict"

const {
    defineStaticPropertiesHandler,
} = require("../util/define-static-properties-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `Error.isError` method.",
            category: "ES2026",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-error-iserror.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2026 '{{name}}' method is forbidden.",
        },
        schema: [
            {
                type: "object",
                properties: { allowTestedProperty: { type: "boolean" } },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        return defineStaticPropertiesHandler(context, {
            Error: { isError: "function" },
        })
    },
}
