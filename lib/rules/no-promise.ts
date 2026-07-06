/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import { createRule } from "../util/create-rule.ts"
import { defineGlobalsHandler } from "../util/define-globals-handler/index.ts"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow the `Promise` class.",
            category: "ES2015",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-promise.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2015 '{{name}}' class is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineGlobalsHandler(context, ["Promise"])
    },
})
