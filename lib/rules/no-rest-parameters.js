/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow rest parameters.",
            category: "ES2015",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.1.0/docs/rules/no-rest-parameters.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2015 rest parameters are forbidden.",
        },
    },
    create(context) {
        return {
            ":function > RestElement"(node) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
}
