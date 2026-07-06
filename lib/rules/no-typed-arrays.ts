/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import { createRule } from "../util/create-rule.ts"
import { defineGlobalsHandler } from "../util/define-globals-handler/index.ts"

export default createRule<"forbidden", []>({
    meta: {
        docs: {
            description: "disallow ES2015 typed arrays.",
            category: "ES2015",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-typed-arrays.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2015 '{{name}}' is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineGlobalsHandler(context, [
            "Int8Array",
            "Uint8Array",
            "Uint8ClampedArray",
            "Int16Array",
            "Uint16Array",
            "Int32Array",
            "Uint32Array",
            "Float32Array",
            "Float64Array",
            "DataView",
        ])
    },
})
