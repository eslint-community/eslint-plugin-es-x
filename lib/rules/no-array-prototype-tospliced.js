"use strict"

const { createRule } = require("../util/create-rule")
const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = createRule({
    meta: {
        docs: {
            description: "disallow the `Array.prototype.toSpliced` method.",
            category: "ES2023",
            proposal: "change-array-by-copy",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-array-prototype-tospliced.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2023 '{{name}}' method is forbidden.",
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
            Array: { toSpliced: "function" },
        })
    },
})
