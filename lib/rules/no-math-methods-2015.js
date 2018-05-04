/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { READ, ReferenceTracker } = require("eslint-utils")

module.exports = {
    meta: {
        docs: {
            description: "disallow Math methods that ES2015 added.",
            category: "ES2015",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v1.1.0/docs/rules/no-math-methods-2015.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden: "ES2015 '{{name}}' method is forbidden.",
        },
    },
    create(context) {
        return {
            "Program:exit"() {
                const tracker = new ReferenceTracker(context.getScope())
                for (const { node, path } of tracker.iterateGlobalReferences({
                    Math: {
                        clz32: { [READ]: true },
                        imul: { [READ]: true },
                        sign: { [READ]: true },
                        log10: { [READ]: true },
                        log2: { [READ]: true },
                        log1p: { [READ]: true },
                        expm1: { [READ]: true },
                        cosh: { [READ]: true },
                        sinh: { [READ]: true },
                        tanh: { [READ]: true },
                        acosh: { [READ]: true },
                        asinh: { [READ]: true },
                        atanh: { [READ]: true },
                        trunc: { [READ]: true },
                        fround: { [READ]: true },
                        cbrt: { [READ]: true },
                        hypot: { [READ]: true },
                    },
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
