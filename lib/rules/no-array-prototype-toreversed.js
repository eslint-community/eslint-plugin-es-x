"use strict"

const { createRule } = require("../util/create-rule")
const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = createRule({
    meta: {
        docs: {
            description: "disallow the `Array.prototype.toReversed` method.",
            category: "ES2023",
            proposal: "change-array-by-copy",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-array-prototype-toreversed.html",
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
            Array: { toReversed: "function" },
            Int8Array: { toReversed: "function" },
            Uint8Array: { toReversed: "function" },
            Uint8ClampedArray: { toReversed: "function" },
            Int16Array: { toReversed: "function" },
            Uint16Array: { toReversed: "function" },
            Int32Array: { toReversed: "function" },
            Uint32Array: { toReversed: "function" },
            Float32Array: { toReversed: "function" },
            Float64Array: { toReversed: "function" },
            BigInt64Array: { toReversed: "function" },
            BigUint64Array: { toReversed: "function" },
        })
    },
})
