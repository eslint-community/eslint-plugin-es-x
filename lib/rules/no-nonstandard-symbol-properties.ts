import { createRule } from "../util/create-rule.ts"
import { defineNonstandardStaticPropertiesHandler } from "../util/define-nonstandard-static-properties-handler/index.ts"
import { symbolProperties } from "../util/well-known-properties.ts"

type Options = [
    {
        allow?: string[]
        allowTestedProperty?: boolean
    }?,
]

export default createRule<"forbidden", Options>({
    meta: {
        docs: {
            description:
                "disallow non-standard static properties on `Symbol` class",
            category: "nonstandard",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-nonstandard-symbol-properties.html",
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
        const allows = new Set([
            ...(context.options[0]?.allow ?? []),
            ...symbolProperties,
        ])
        return defineNonstandardStaticPropertiesHandler(context, {
            Symbol: allows,
        })
    },
})
