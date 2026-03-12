/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { createRule } = require("../util/create-rule")

const Pattern = /^0[bB]/u

module.exports = createRule({
    meta: {
        docs: {
            description: "disallow binary numeric literals.",
            category: "ES2015",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-binary-numeric-literals.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2015 binary numeric literals are forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            Literal(node) {
                if (typeof node.value === "number" && Pattern.test(node.raw)) {
                    context.report({ node, messageId: "forbidden" })
                }
            },
        }
    },
})
