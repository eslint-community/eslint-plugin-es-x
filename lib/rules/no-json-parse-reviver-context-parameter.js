"use strict"

const { ReferenceTracker, CALL } = require("@eslint-community/eslint-utils")

module.exports = {
    meta: {
        docs: {
            description:
                "disallow the `context` parameter in `JSON.parse` reviver function",
            category: "ES2026",
            proposal: "json-parse-with-source",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-json-parse-reviver-context-parameter.html",
        },
        fixable: null,
        messages: {
            forbidden:
                "Unexpected context parameter in JSON.parse reviver function.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        const sourceCode = context.sourceCode
        return {
            "Program:exit"(program) {
                const tracker = new ReferenceTracker(
                    sourceCode.getScope(program),
                )
                for (const { node } of tracker.iterateGlobalReferences({
                    JSON: { parse: { [CALL]: true } },
                })) {
                    if (node.type !== "CallExpression") {
                        continue
                    }
                    const reviver = node.arguments[1]
                    if (
                        !reviver ||
                        (reviver.type !== "FunctionExpression" &&
                            reviver.type !== "ArrowFunctionExpression")
                    ) {
                        continue
                    }
                    if (reviver.params.length >= 3) {
                        context.report({
                            node: reviver.params[2],
                            messageId: "forbidden",
                        })
                    }
                }
            },
        }
    },
}
