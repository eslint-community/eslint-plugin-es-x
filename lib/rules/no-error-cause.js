/**
 * @author Sosuke Suzuki <https://github.com/sosukesuzuki>
 * See LICENSE file in root directory for full license.
 */

"use strict"

module.exports = {
    meta: {
        docs: {
            description: "disallow Erroc Cause.",
            category: "ES2022",
            recommended: false,
            url: "http://ota-meshi.github.io/eslint-plugin-es-x/rules/no-error-cause.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2022 Error Cause is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            'NewExpression[callee.name="Error"][arguments.1.type=ObjectExpression] :nth-child(2) > Property[key.name="cause"]'(
                node,
            ) {
                context.report({
                    node,
                    messageId: "forbidden",
                })
            },
        }
    },
}
