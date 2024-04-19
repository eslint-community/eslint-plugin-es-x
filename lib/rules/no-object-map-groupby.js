"use strict"

const rules = [require("./no-object-groupby"), require("./no-map-groupby")]
module.exports = {
    meta: {
        deprecated: true,
        docs: {
            description:
                "disallow the `{Object,Map}.groupBy()` function (array grouping).",
            category: "ES2024",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-object-map-groupby.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2024 '{{name}}' is forbidden.",
        },
        replacedBy: ["no-object-groupby", "no-map-groupby"],
        schema: [],
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
