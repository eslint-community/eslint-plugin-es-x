import { createRule } from "../util/create-rule.ts"
import { defineGlobalsHandler } from "../util/define-globals-handler/index.ts"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow the `DisposableStack` class.",
            category: "ES2027",
            proposal: "explicit-resource-management",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-disposablestack.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2027 '{{name}}' class is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineGlobalsHandler(context, ["DisposableStack"])
    },
})
