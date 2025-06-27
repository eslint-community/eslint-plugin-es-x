/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict"

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "disallow 'instanceof' for Array",
            category: "Best Practices",
            url: "https://github.com/eslint-community/eslint-plugin-es-x/blob/master/docs/rules/my-no-instanceof-array.md",
        },
        fixable: "code",
        schema: [],
        type: "problem",
    },

    create(context) {
        const sourceCode = context.sourceCode

        /**
         * Checks whether the given node is RHS of instanceof.
         *
         * @param {ASTNode} node - The node to check.
         * @returns {boolean} `true` if the node is RHS of instanceof.
         */
        function isRhsOfInstanceof(node) {
            return (
                node.parent.type === "BinaryExpression" &&
                node.parent.operator === "instanceof" &&
                node.parent.right === node
            )
        }

        return {
            "Program:exit"(program) {
                const globalScope = sourceCode.getScope(program)
                const variable = globalScope.set.get("Array")

                // Skip if undefined or shadowed
                if (variable == null || variable.defs.length > 0) {
                    return
                }

                for (const reference of variable.references) {
                    const id = reference.identifier
                    const node = id.parent

                    // Skip if it's not instanceof
                    if (!isRhsOfInstanceof(id)) {
                        continue
                    }

                    // Report
                    context.report({
                        node,
                        loc: node.loc,
                        message:
                            "Unexpected 'instanceof' operator. Use 'Array.isArray' instead.",
                        fix: (fixer) =>
                            fixer.replaceText(
                                node,
                                `Array.isArray(${sourceCode.getText(
                                    node.left,
                                )})`,
                            ),
                    })
                }
            },
        }
    },
}
