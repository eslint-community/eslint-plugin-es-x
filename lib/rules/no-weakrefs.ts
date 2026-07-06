/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
import { createRule } from "../util/create-rule"
import { defineGlobalsHandler } from "../util/define-globals-handler/index"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description:
                "disallow the `WeakRef` and `FinalizationRegistry` class.",
            category: "ES2021",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-weakrefs.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2021 '{{name}}' class is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineGlobalsHandler(context, [
            "WeakRef",
            "FinalizationRegistry",
        ])
    },
})
