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
            description: "disallow the `Iterator.prototype.join` method.",
            category: "ES2027",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-iterator-prototype-join.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2027 '{{name}}' method is forbidden.",
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
            Iterator: { join: "function" },
        })
    },
})
