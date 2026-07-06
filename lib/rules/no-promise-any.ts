/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
import { createRule } from "../util/create-rule.ts"
import { mergeVisitors } from "../util/merge-visitors.ts"
import { defineGlobalsHandler } from "../util/define-globals-handler/index.ts"
import { defineStaticPropertiesHandler } from "../util/define-static-properties-handler/index.ts"

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
                "disallow `Promise.any` function and `AggregateError` class",
            category: "ES2021",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-promise-any.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2021 '{{name}}' is forbidden.",
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
        return mergeVisitors(
            defineStaticPropertiesHandler(context, {
                Promise: { any: "function" },
            }),
            defineGlobalsHandler(context, ["AggregateError"]),
        )
    },
})
