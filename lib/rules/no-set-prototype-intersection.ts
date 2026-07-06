import { createRule } from "../util/create-rule.ts"
import { definePrototypePropertiesHandler } from "../util/define-prototype-properties-handler/index.ts"

type Options = [
    {
        aggressive?: boolean
        allowTestedProperty?: boolean
    }?,
]

export default createRule<"forbidden", Options>({
    meta: {
        docs: {
            description: "disallow the `Set.prototype.intersection` method.",
            category: "ES2025",
            proposal: "set-methods",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-set-prototype-intersection.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2025 '{{name}}' method is forbidden.",
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
            Set: { intersection: "function" },
        })
    },
})
