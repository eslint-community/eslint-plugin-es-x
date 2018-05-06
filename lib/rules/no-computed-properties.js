/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow computed properties.",
            category: "ES2015",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/docs/rules/no-computed-properties.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2015 computed properties are forbidden.",
        },
    },
    create(context) {
        return {
            ":matches(Property, MethodDefinition)[computed=true]"(node) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
}
