import { createRule } from "../util/create-rule"
import { mergeVisitors } from "../util/merge-visitors"
import noStringPrototypeIswellformed from "./no-string-prototype-iswellformed"
import noStringPrototypeTowellformed from "./no-string-prototype-towellformed"

type Options = [
    {
        aggressive?: boolean
        allowTestedProperty?: boolean
    }?,
]

const rules = [noStringPrototypeIswellformed, noStringPrototypeTowellformed]

export default createRule<"forbidden", Options>({
    meta: {
        deprecated: true,
        docs: {
            description:
                "disallow the `String.prototype.{isWellFormed,toWellFormed}` methods.",
            category: "ES2024",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-string-prototype-iswellformed-towellformed.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2024 '{{name}}' method is forbidden.",
        },
        replacedBy: [
            "no-string-prototype-iswellformed",
            "no-string-prototype-towellformed",
        ],
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
        return mergeVisitors(...rules.map((rule) => rule.create(context)))
    },
})
