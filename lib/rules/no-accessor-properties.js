/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow accessor properties.",
            category: "ES5",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/docs/rules/no-accessor-properties.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES5 accessor properties are forbidden.",
        },
    },
    create(context) {
        return {
            "Property[kind='get'], Property[kind='set'], MethodDefinition[kind='get'], MethodDefinition[kind='set']"(
                node
            ) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
}
