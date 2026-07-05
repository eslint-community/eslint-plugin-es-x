import { createRule } from "../util/create-rule"
import { defineNonstandardPrototypePropertiesHandler } from "../util/define-nonstandard-prototype-properties-handler/index"
import { temporalPlainMonthDayPrototypeProperties } from "../util/well-known-properties"

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
                "disallow non-standard properties on Temporal.PlainMonthDay instance",
            category: "nonstandard",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-nonstandard-temporal-plainmonthday-prototype-properties.html",
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
            ...temporalPlainMonthDayPrototypeProperties,
        ])
        return defineNonstandardPrototypePropertiesHandler(context, {
            "Temporal.PlainMonthDay": allows,
        })
    },
})
