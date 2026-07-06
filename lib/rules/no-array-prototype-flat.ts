/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

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
            description:
                "disallow the `Array.prototype.{flat,flatMap}` method.",
            category: "ES2019",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-array-prototype-flat.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2019 '{{name}}' method is forbidden.",
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
            Array: { flat: "function", flatMap: "function" },
        })
    },
})
