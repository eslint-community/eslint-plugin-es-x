/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import { createRule } from "../util/create-rule.ts"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow `new.target` meta property.",
            category: "ES2015",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-new-target.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2015 'new.target' meta property is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            "MetaProperty[meta.name='new'][property.name='target']"(node) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
})
