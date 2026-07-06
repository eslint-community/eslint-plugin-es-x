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
                "disallow the `Date.prototype.{getYear,setYear}` methods.",
            category: "legacy",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-date-prototype-getyear-setyear.html",
        },
        fixable: null,
        messages: {
            forbidden: "Annex B feature '{{name}}' method is forbidden.",
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
            Date: { getYear: "function", setYear: "function" },
        })
    },
})
