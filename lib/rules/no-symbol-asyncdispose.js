"use strict"

const { createRule } = require("../util/create-rule")
const {
    defineStaticPropertiesHandler,
} = require("../util/define-static-properties-handler")

module.exports = createRule({
    meta: {
        docs: {
            description: "disallow the `Symbol.asyncDispose` property",
            category: "ES2027",
            proposal: "explicit-resource-management",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-symbol-asyncdispose.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2027 '{{name}}' property is forbidden.",
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
            Symbol: { asyncDispose: "symbol" },
        })
    },
})
