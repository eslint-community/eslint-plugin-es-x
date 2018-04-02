/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow rest/spread properties.",
            category: "ES2018",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v0.0.0/docs/rules/no-rest-spread-properties.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2018 rest/spread properties are forbidden.",
        },
    },
    create(context) {
        return {
            "ObjectPattern > RestElement"(node) {
                context.report({ node, messageId: "forbidden" })
            },
            "ObjectExpression > SpreadElement"(node) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
}
