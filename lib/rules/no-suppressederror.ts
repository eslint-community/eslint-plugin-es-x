import { createRule } from "../util/create-rule"
import { defineGlobalsHandler } from "../util/define-globals-handler/index"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow the `SuppressedError` class.",
            category: "ES2027",
            proposal: "explicit-resource-management",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-suppressederror.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2027 '{{name}}' class is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineGlobalsHandler(context, ["SuppressedError"])
    },
})
