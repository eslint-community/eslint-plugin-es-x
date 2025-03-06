"use strict"

const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `Array.prototype.with` method.",
            category: "ES2023",
            proposal: "change-array-by-copy",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-array-prototype-with.html",
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
            Array: { with: "function" },
            Int8Array: { with: "function" },
            Uint8Array: { with: "function" },
            Uint8ClampedArray: { with: "function" },
            Int16Array: { with: "function" },
            Uint16Array: { with: "function" },
            Int32Array: { with: "function" },
            Uint32Array: { with: "function" },
            Float32Array: { with: "function" },
            Float64Array: { with: "function" },
            BigInt64Array: { with: "function" },
            BigUint64Array: { with: "function" },
        })
    },
}
