/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import { createRule } from "../util/create-rule"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow modules.",
            category: "ES2015",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-modules.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2015 modules are forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            "ExportAllDeclaration, ExportDefaultDeclaration, ExportNamedDeclaration, ImportDeclaration"(
                node,
            ) {
                context.report({ node, messageId: "forbidden" })
            },
        }
    },
})
