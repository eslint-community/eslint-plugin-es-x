/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import { createRule } from "../util/create-rule.ts"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow `for-of` statements.",
            category: "ES2015",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-for-of-loops.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2015 'for-of' statements are forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            ForOfStatement(node) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
})
