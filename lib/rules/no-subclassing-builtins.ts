/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import { READ, ReferenceTracker } from "@eslint-community/eslint-utils"
import { createRule } from "../util/create-rule.ts"
import type * as ESTree from "estree"

export default createRule<"forbidden", []>({
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
                        (node.parent as ESTree.BaseClass).superClass === node
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
