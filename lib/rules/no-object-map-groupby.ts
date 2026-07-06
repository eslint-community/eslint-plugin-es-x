import { createRule } from "../util/create-rule"
import { mergeVisitors } from "../util/merge-visitors"

import noObjectGroupby from "./no-object-groupby"
import noMapGroupby from "./no-map-groupby"

const rules = [noObjectGroupby, noMapGroupby]

export default createRule<"forbidden", []>({
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
