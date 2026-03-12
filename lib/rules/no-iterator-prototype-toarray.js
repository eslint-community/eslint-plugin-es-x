"use strict"

const { createRule } = require("../util/create-rule")
const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = createRule({
    meta: {
        docs: {
            description: "disallow the `Iterator.prototype.toArray` method.",
            category: "ES2025",
            proposal: "iterator-helpers",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-iterator-prototype-toarray.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2025 '{{name}}' method is forbidden.",
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
            Iterator: { toArray: "function" },
        })
    },
})
