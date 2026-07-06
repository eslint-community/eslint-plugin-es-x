/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import { createRule } from "../util/create-rule.ts"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow accessor properties.",
            category: "ES5",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-accessor-properties.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES5 accessor properties are forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            "Property[kind='get'], Property[kind='set'], MethodDefinition[kind='get'], MethodDefinition[kind='set']"(
                node,
            ) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
})
