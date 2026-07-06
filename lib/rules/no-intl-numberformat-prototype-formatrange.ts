import { createRule } from "../util/create-rule"
import { definePrototypePropertiesHandler } from "../util/define-prototype-properties-handler/index"

type Options = [
    {
        aggressive?: boolean
        allowTestedProperty?: boolean
    }?,
]

export default createRule<"forbidden", Options>({
    meta: {
        docs: {
            description:
                "disallow the `NumberFormat.prototype.formatRange` method.",
            category: "ES2023-Intl-API",
            proposal: "intl-numberformat-v3",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-intl-numberformat-prototype-formatrange.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2023 Intl API '{{name}}' method is forbidden.",
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
            "Intl.NumberFormat": { formatRange: "function" },
        })
    },
})
