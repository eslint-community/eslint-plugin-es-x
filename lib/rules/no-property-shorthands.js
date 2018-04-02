/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow property shorthands.",
            category: "ES2015",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v0.0.0/docs/rules/no-property-shorthands.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2015 property shorthands are forbidden.",
        },
    },
    create(context) {
        return {
            "ObjectExpression > :matches(Property[method=true], Property[shorthand=true])"(
                node
            ) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
}
