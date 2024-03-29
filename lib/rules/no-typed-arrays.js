/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { READ, ReferenceTracker } = require("@eslint-community/eslint-utils")
const { getSourceCode } = require("eslint-compat-utils")

module.exports = {
    meta: {
        docs: {
            description: "disallow ES2015 typed arrays.",
            category: "ES2015",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-typed-arrays.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2015 '{{name}}' is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            "Program:exit"(program) {
                const sourceCode = getSourceCode(context)
                const tracker = new ReferenceTracker(
                    sourceCode.getScope(program),
                )
                for (const { node, path } of tracker.iterateGlobalReferences({
                    Int8Array: { [READ]: true },
                    Uint8Array: { [READ]: true },
                    Uint8ClampedArray: { [READ]: true },
                    Int16Array: { [READ]: true },
                    Uint16Array: { [READ]: true },
                    Int32Array: { [READ]: true },
                    Uint32Array: { [READ]: true },
                    Float32Array: { [READ]: true },
                    Float64Array: { [READ]: true },
                    DataView: { [READ]: true },
                })) {
                    context.report({
                        node,
                        messageId: "forbidden",
                        data: { name: path.join(".") },
                    })
                }
            },
        }
    },
}
