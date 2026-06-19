"use strict"

const { createRule } = require("../util/create-rule")
const {
    defineStaticPropertiesHandler,
} = require("../util/define-static-properties-handler")

module.exports = createRule({
    meta: {
        docs: {
            description: "disallow the `Atomics.pause` method.",
            category: "ES2027",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-atomics-pause.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2027 '{{name}}' method is forbidden.",
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
            Atomics: { pause: "function" },
        })
    },
})
