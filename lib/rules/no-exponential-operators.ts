/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import { createRule } from "../util/create-rule.ts"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow exponential operators.",
            category: "ES2016",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-exponential-operators.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2016 exponential operators are forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            "AssignmentExpression[operator='**='], BinaryExpression[operator='**']"(
                node,
            ) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
})
