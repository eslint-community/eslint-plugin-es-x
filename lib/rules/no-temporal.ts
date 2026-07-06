import { createRule } from "../util/create-rule.ts"
import { defineGlobalsHandler } from "../util/define-globals-handler/index.ts"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow the `Temporal` global object.",
            category: "ES2027",
            proposal: "temporal",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-temporal.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2027 '{{name}}' global object is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineGlobalsHandler(context, ["Temporal"])
    },
})
