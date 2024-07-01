"use strict"

const rules = [
    require("./no-string-prototype-iswellformed"),
    require("./no-string-prototype-towellformed"),
]

module.exports = {
    meta: {
        deprecated: true,
        docs: {
            description:
                "disallow the `String.prototype.{isWellFormed,toWellFormed}` methods.",
            category: "ES2024",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-string-prototype-iswellformed-towellformed.html",
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
                },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        const visitorEntries = rules.flatMap((rule) =>
            Object.entries(rule.create(context)),
        )
        return Object.fromEntries(
            [...new Set(visitorEntries.map(([key]) => key))].map((key) => {
                const visitors = visitorEntries.filter(([k]) => k === key)
                return [
                    key,
                    (...args) => {
                        for (const [, visitor] of visitors) {
                            visitor(...args)
                        }
                    },
                ]
            }),
        )
    },
}
