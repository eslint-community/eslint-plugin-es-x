/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import { createRule } from "../util/create-rule"
import { defineGlobalsHandler } from "../util/define-globals-handler/index"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow the `SharedArrayBuffer` class.",
            category: "ES2017",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-shared-array-buffer.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2017 '{{name}}' class is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineGlobalsHandler(context, ["SharedArrayBuffer"])
    },
})
