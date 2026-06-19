"use strict"

const { createRule } = require("../util/create-rule")
const {
    defineStaticPropertiesHandler,
} = require("../util/define-static-properties-handler")

module.exports = createRule({
    meta: {
        docs: {
            description: "disallow the `Iterator.zipKeyed` method",
            category: "ES2027",
            proposal: "joint-iteration",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-iterator-zipkeyed.html",
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
            Iterator: { zipKeyed: "function" },
        })
    },
})
