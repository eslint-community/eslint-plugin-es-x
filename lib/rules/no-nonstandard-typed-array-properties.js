"use strict"

const {
    READ,
    ReferenceTracker,
    getPropertyName,
} = require("@eslint-community/eslint-utils")
const { getSourceCode } = require("eslint-compat-utils")
const { typedArrayProperties } = require("../util/well-known-properties")

const typedArrayList = [
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Uint16Array",
    "Int32Array",
    "Uint32Array",
    "Float32Array",
    "Float64Array",
    "BigInt64Array",
    "BigUint64Array",
]

module.exports = {
    meta: {
        docs: {
            description: "disallow non-standard typed array class properties",
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
                },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        /** @type {Set<string>} */
        const allows = new Set([
            ...(context.options[0]?.allow || []),
            ...typedArrayProperties,
        ])
        return {
            "Program:exit"(program) {
                const sourceCode = getSourceCode(context)
                const tracker = new ReferenceTracker(
                    sourceCode.getScope(program),
                )
                for (const { node, path } of tracker.iterateGlobalReferences(
                    Object.fromEntries(
                        typedArrayList.map((name) => [name, { [READ]: true }]),
                    ),
                )) {
                    if (
                        node.parent.type !== "MemberExpression" ||
                        node.parent.object !== node
                    ) {
                        continue
                    }
                    const propertyName = getPropertyName(
                        node.parent,
                        sourceCode.getScope(node),
                    )
                    if (propertyName == null || allows.has(propertyName)) {
                        continue
                    }

                    context.report({
                        node,
                        messageId: "forbidden",
                        data: { name: [...path, propertyName].join(".") },
                    })
                }
            },
        }
    },
}
