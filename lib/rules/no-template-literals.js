/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow template literals.",
            category: "ES2015",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v0.0.0/docs/rules/no-template-literals.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2015 template literals are forbidden.",
        },
    },
    create(context) {
        return {
            "TaggedTemplateExpression, :not(TaggedTemplateExpression) > TemplateLiteral"(
                node
            ) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
}
