"use strict"

const { createRule } = require("../util/create-rule")
const { mergeVisitors } = require("../util/merge-visitors")

const rules = [require("./no-object-groupby"), require("./no-map-groupby")]

module.exports = createRule({
    meta: {
        deprecated: true,
        docs: {
            description:
                "disallow the `{Object,Map}.groupBy()` function (array grouping).",
            category: "ES2024",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-object-map-groupby.html",
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
        return mergeVisitors(...rules.map((rule) => rule.create(context)))
    },
})
