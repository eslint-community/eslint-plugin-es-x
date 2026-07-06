/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import { createRule } from "../util/create-rule"

const Pattern = /^0[oO]/u

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow octal numeric literals.",
            category: "ES2015",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-octal-numeric-literals.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2015 octal numeric literals are forbidden.",
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
