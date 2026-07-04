/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { createRule } = require("../util/create-rule")
const { mergeVisitors } = require("../util/merge-visitors")

const rules = [
    require("./no-array-prototype-at"),
    require("./no-string-prototype-at"),
]

module.exports = createRule({
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
