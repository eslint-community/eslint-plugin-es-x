"use strict"

const {
    defineStaticPropertiesHandler,
} = require("../util/define-static-properties-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `Math.f16round` method.",
            category: "ES2025",
            recommended: false,
            proposal: "float16array",
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-math-f16round.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2025 '{{name}}' method is forbidden.",
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
            Math: { f16round: "function" },
        })
    },
}
