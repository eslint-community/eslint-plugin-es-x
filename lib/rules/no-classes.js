/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow class declarations.",
            category: "ES2015",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.1.0/docs/rules/no-classes.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2015 class declarations are forbidden.",
        },
    },
    create(context) {
        return {
            "ClassDeclaration, ClassExpression"(node) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
}
