import { createRule } from "../util/create-rule.ts"
import { defineStaticPropertiesHandler } from "../util/define-static-properties-handler/index.ts"

type Options = [
    {
        allowTestedProperty?: boolean
    }?,
]

export default createRule<"forbidden", Options>({
    meta: {
        docs: {
            description: "disallow the `Atomics.waitAsync` method.",
            category: "ES2024",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-atomics-waitasync.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2024 '{{name}}' method is forbidden.",
        },
        schema: [
            {
                type: "object",
                properties: {
                    allowTestedProperty: { type: "boolean" },
                },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        return defineStaticPropertiesHandler(context, {
            Atomics: { waitAsync: "function" },
        })
    },
})
