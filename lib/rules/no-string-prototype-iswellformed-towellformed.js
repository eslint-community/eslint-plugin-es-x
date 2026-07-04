"use strict"

const { createRule } = require("../util/create-rule")
const { mergeVisitors } = require("../util/merge-visitors")
const rules = [
    require("./no-string-prototype-iswellformed"),
    require("./no-string-prototype-towellformed"),
]

module.exports = createRule({
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
