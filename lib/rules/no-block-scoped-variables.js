/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow block-scoped variable declarations.",
            category: "ES2015",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/docs/rules/no-block-scoped-variables.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2015 block-scoped variables are forbidden.",
        },
    },
    create(context) {
        return {
            "VariableDeclaration[kind='const'], VariableDeclaration[kind='let']"(
                node
            ) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
}
