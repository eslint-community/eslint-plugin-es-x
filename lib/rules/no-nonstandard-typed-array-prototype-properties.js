"use strict"

const {
    defineNonstandardPrototypePropertiesHandler,
} = require("../util/define-nonstandard-prototype-properties-handler")
const {
    typedArrayPrototypeProperties,
    uint8ArrayPrototypeProperties,
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
                "disallow non-standard properties on typed array instance",
            category: "nonstandard",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-nonstandard-typed-array-prototype-properties.html",
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
            ...typedArrayPrototypeProperties,
        ])
        /** @type {Set<string>} */
        const uint8ArrayAllows = new Set([
            ...(context.options[0]?.allow || []),
            ...uint8ArrayPrototypeProperties,
        ])
        return defineNonstandardPrototypePropertiesHandler(
            context,
            Object.fromEntries([
                ...typedArrayList.map((name) => [name, typedArrayAllows]),
                ["Uint8Array", uint8ArrayAllows],
            ]),
            {
                // Allow index properties
                allowsPropertyName: (name) => /^(?:[1-9]\d*|0)$/u.test(name),
            },
        )
    },
}
