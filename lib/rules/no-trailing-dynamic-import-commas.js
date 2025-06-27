"use strict"

const { isCommaToken } = require("../utils")

module.exports = {
    meta: {
        docs: {
            description: "disallow trailing commas in `import()`",
            category: "ES2025",
            proposal: "import-attributes",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-trailing-dynamic-import-commas.html",
        },
        fixable: "code",
        messages: {
            forbidden: "ES2025 trailing commas in 'import()' are forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        const sourceCode = context.sourceCode
        return {
            ImportExpression(node) {
                const lastParam = node.options || node.source
                const token = sourceCode.getTokenAfter(lastParam)
                if (isCommaToken(token)) {
                    context.report({
                        loc: token.loc,
                        messageId: "forbidden",
                        fix(fixer) {
                            return fixer.remove(token)
                        },
                    })
                }
            },
        }
    },
}
