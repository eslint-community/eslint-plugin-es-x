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
            description: "disallow the `Uint8Array.fromHex` method.",
            category: "ES2026",
            recommended: false,
            proposal: "arraybuffer-base64",
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-uint8array-fromhex.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2026 '{{name}}' method is forbidden.",
        },
        schema: [
            {
                type: "object",
                properties: { allowTestedProperty: { type: "boolean" } },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        return defineStaticPropertiesHandler(context, {
            Uint8Array: { fromHex: "function" },
        })
    },
})
