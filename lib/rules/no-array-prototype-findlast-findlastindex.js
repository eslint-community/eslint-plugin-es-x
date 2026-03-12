"use strict"

const { createRule } = require("../util/create-rule")
const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = createRule({
    meta: {
        docs: {
            description:
                "disallow the `Array.prototype.{findLast,findLastIndex}` methods.",
            category: "ES2023",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-array-prototype-findlast-findlastindex.html",
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
            Array: { findLast: "function", findLastIndex: "function" },
            Int8Array: { findLast: "function", findLastIndex: "function" },
            Uint8Array: { findLast: "function", findLastIndex: "function" },
            Uint8ClampedArray: {
                findLast: "function",
                findLastIndex: "function",
            },
            Int16Array: { findLast: "function", findLastIndex: "function" },
            Uint16Array: { findLast: "function", findLastIndex: "function" },
            Int32Array: { findLast: "function", findLastIndex: "function" },
            Uint32Array: { findLast: "function", findLastIndex: "function" },
            Float32Array: { findLast: "function", findLastIndex: "function" },
            Float64Array: { findLast: "function", findLastIndex: "function" },
            BigInt64Array: { findLast: "function", findLastIndex: "function" },
            BigUint64Array: { findLast: "function", findLastIndex: "function" },
        })
    },
})
