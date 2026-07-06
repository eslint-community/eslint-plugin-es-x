/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */

import { createRule } from "../util/create-rule.ts"
import { mergeVisitors } from "../util/merge-visitors.ts"
import noArrayPrototypeAtRule from "./no-array-prototype-at.ts"
import noStringPrototypeAtRule from "./no-string-prototype-at.ts"

const rules = [noArrayPrototypeAtRule, noStringPrototypeAtRule]

type Options = [
    {
        aggressive?: boolean
        allowTestedProperty?: boolean
    }?,
]

export default createRule<"forbidden", Options>({
    meta: {
        deprecated: true,
        docs: {
            description:
                "disallow the `{Array,String}.prototype.at()` methods.",
            category: "ES2022",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-array-string-prototype-at.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2022 '{{name}}' method is forbidden.",
        },
        replacedBy: ["no-array-prototype-at", "no-string-prototype-at"],
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
