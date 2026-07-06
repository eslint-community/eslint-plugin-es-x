/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import { createRule } from "../util/create-rule.ts"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow computed properties.",
            category: "ES2015",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-computed-properties.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2015 computed properties are forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            ":matches(Property, MethodDefinition)[computed=true]"(node) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
})
