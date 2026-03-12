/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { READ, ReferenceTracker } = require("@eslint-community/eslint-utils")
const { createRule } = require("../util/create-rule")

module.exports = createRule({
    meta: {
        docs: {
            description: "disallow the subclassing of the built-in classes.",
            category: "ES2015",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-subclassing-builtins.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2015 subclassing of '{{name}}' is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            /**
             * @param {import("estree").Program} program
             */
            "Program:exit"(program) {
                const sourceCode = context.sourceCode
                const tracker = new ReferenceTracker(
                    sourceCode.getScope(program),
                )
                for (const { node, path } of tracker.iterateGlobalReferences({
                    Array: { [READ]: true },
                    Boolean: { [READ]: true },
                    Error: { [READ]: true },
                    RegExp: { [READ]: true },
                    Function: { [READ]: true },
                    Map: { [READ]: true },
                    Number: { [READ]: true },
                    Promise: { [READ]: true },
                    Set: { [READ]: true },
                    String: { [READ]: true },
                })) {
                    if (
                        node.parent.type.startsWith("Class") &&
                        /** @type {import("estree").BaseClass} */ (node.parent)
                            .superClass === node
                    ) {
                        context.report({
                            node,
                            messageId: "forbidden",
                            data: { name: path.join(".") },
                        })
                    }
                }
            },
        }
    },
})
