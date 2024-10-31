"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow the second parameter to `import()`",
            category: "ES2025",
            proposal: "import-attributes",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-dynamic-import-options.html",
        },
        fixable: null,
        messages: {
            forbidden:
                "ES2025 the second parameter to 'import()' is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            ImportExpression(node) {
                if (node.options) {
                    context.report({
                        node: node.options,
                        messageId: "forbidden",
                    })
                }
            },
        }
    },
}
