"use strict"

const { READ, ReferenceTracker } = require("@eslint-community/eslint-utils")
const { getSourceCode } = require("eslint-compat-utils")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `Intl.Segmenter` object.",
            category: "ES2022-Intl-API",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-intl-segmenter.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2022 Intl API '{{name}}' object is forbidden.",
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
                    Intl: {
                        Segmenter: { [READ]: true },
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
