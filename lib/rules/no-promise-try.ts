/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
import { createRule } from "../util/create-rule"
import { defineStaticPropertiesHandler } from "../util/define-static-properties-handler/index"

type Options = [
    {
        allowTestedProperty?: boolean
    }?,
]

export default createRule<"forbidden", Options>({
    meta: {
        docs: {
            description: "disallow `Promise.try` function",
            category: "ES2025",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-promise-try.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2025 '{{name}}' is forbidden.",
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
            Promise: { try: "function" },
        })
    },
})
