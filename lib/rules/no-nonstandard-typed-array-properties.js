"use strict"

const {
    defineNonstandardStaticPropertiesHandler,
} = require("../util/define-nonstandard-static-properties-handler")
const {
    typedArrayProperties,
    uint8ArrayProperties,
} = require("../util/well-known-properties")

const typedArrayList = [
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Uint16Array",
    "Int32Array",
    "Uint32Array",
    "Float16Array",
    "Float32Array",
    "Float64Array",
    "BigInt64Array",
    "BigUint64Array",
]

module.exports = {
    meta: {
        docs: {
            description:
                "disallow non-standard static properties on typed array class",
            category: "nonstandard",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-nonstandard-typed-array-properties.html",
        },
        fixable: null,
        messages: {
            forbidden: "Non-standard '{{name}}' property is forbidden.",
        },
        schema: [
            {
                type: "object",
                properties: {
                    allow: {
                        type: "array",
                        items: { type: "string" },
                        uniqueItems: true,
                    },
                    allowTestedProperty: { type: "boolean" },
                },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        /** @type {Set<string>} */
        const typedArrayAllows = new Set([
            ...(context.options[0]?.allow || []),
            ...typedArrayProperties,
        ])
        /** @type {Set<string>} */
        const uint8ArrayAllows = new Set([
            ...(context.options[0]?.allow || []),
            ...uint8ArrayProperties,
        ])
        return defineNonstandardStaticPropertiesHandler(
            context,
            Object.fromEntries([
                ...typedArrayList.map((typedArray) => [
                    typedArray,
                    typedArrayAllows,
                ]),
                ["Uint8Array", uint8ArrayAllows],
            ]),
        )
    },
}
