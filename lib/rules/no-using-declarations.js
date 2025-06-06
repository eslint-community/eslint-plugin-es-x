"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow `using` and `await using` declarations",
            category: "ES2026",
            proposal: "explicit-resource-management",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-using-declarations.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2026 '{{kind}}' declarations are forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            VariableDeclaration(node) {
                if (node.kind === "using" || node.kind === "await using") {
                    context.report({
                        node,
                        messageId: "forbidden",
                        data: {
                            kind: node.kind,
                        },
                    })
                }
            },
        }
    },
}
