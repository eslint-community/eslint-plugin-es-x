/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import { createRule } from "../util/create-rule.ts"
import { mergeVisitors } from "../util/merge-visitors.ts"
import { defineGlobalsHandler } from "../util/define-globals-handler/index.ts"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow `bigint` syntax and built-ins",
            category: "ES2020",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-bigint.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2020 BigInt is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return mergeVisitors(
            {
                Literal(node) {
                    if ("bigint" in node && node.bigint != null) {
                        context.report({ messageId: "forbidden", node })
                    }
                },
            },
            defineGlobalsHandler(context, [
                "BigInt",
                "BigInt64Array",
                "BigUint64Array",
            ]),
        )
    },
})
