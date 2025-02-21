"use strict"

const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `Array.prototype.toSorted` method.",
            category: "ES2023",
            proposal: "change-array-by-copy",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-array-prototype-tosorted.html",
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
            Array: { toSorted: "function" },
            Int8Array: { toSorted: "function" },
            Uint8Array: { toSorted: "function" },
            Uint8ClampedArray: { toSorted: "function" },
            Int16Array: { toSorted: "function" },
            Uint16Array: { toSorted: "function" },
            Int32Array: { toSorted: "function" },
            Uint32Array: { toSorted: "function" },
            Float32Array: { toSorted: "function" },
            Float64Array: { toSorted: "function" },
            BigInt64Array: { toSorted: "function" },
            BigUint64Array: { toSorted: "function" },
        })
    },
}
