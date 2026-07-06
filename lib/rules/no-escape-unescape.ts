import { createRule } from "../util/create-rule"
import { defineGlobalsHandler } from "../util/define-globals-handler/index"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow `escape` and `unescape`",
            category: "legacy",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-escape-unescape.html",
        },
        fixable: null,
        messages: {
            forbidden: "Annex B feature '{{name}}' is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineGlobalsHandler(context, ["escape", "unescape"])
    },
})
