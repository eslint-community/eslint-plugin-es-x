/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow modules.",
            category: "ES2015",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v0.0.0/docs/rules/no-modules.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2015 modules are forbidden.",
        },
    },
    create(context) {
        return {
            "ExportAllDeclaration, ExportDefaultDeclaration, ExportNamedDeclaration, ImportDeclaration"(
                node
            ) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
}
