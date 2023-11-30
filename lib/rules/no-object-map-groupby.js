"use strict"

const { ReferenceTracker, READ } = require("@eslint-community/eslint-utils")
const { getSourceCode } = require("eslint-compat-utils")

module.exports = {
    meta: {
        docs: {
            description:
                "disallow the `{Object,Map}.groupBy()` method (array grouping).",
            category: "ES2024",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-object-map-groupby.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2024 '{{name}}' method is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            "Program:exit"(program) {
                const sourceCode = getSourceCode(context)
                const tracker = new ReferenceTracker(
                    sourceCode.getScope(program),
                )
                for (const { node, path } of tracker.iterateGlobalReferences({
                    Object: {
                        groupBy: { [READ]: true },
                    },
                    Map: {
                        groupBy: { [READ]: true },
                    },
                })) {
                    context.report({
                        node,
                        messageId: "forbidden",
                        data: { name: path.join(".") },
                    })
                }
            },
        }
    },
}
