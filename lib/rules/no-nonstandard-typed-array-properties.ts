import { createRule } from "../util/create-rule.ts"
import { defineNonstandardStaticPropertiesHandler } from "../util/define-nonstandard-static-properties-handler/index.ts"
import {
    typedArrayProperties,
    uint8ArrayProperties,
} from "../util/well-known-properties.ts"

type Options = [
    {
        allow?: string[]
        allowTestedProperty?: boolean
    }?,
]

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

export default createRule<"forbidden", Options>({
    meta: {
        docs: {
            description:
                "disallow non-standard static properties on typed array class",
            category: "nonstandard",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-nonstandard-typed-array-properties.html",
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
        const typedArrayAllows = new Set([
            ...(context.options[0]?.allow ?? []),
            ...typedArrayProperties,
        ])
        const uint8ArrayAllows = new Set([
            ...(context.options[0]?.allow ?? []),
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
})
