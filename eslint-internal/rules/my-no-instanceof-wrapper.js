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
            description: "disallow 'instanceof' for wrapper objects",
            category: "Best Practices",
            url: "https://github.com/ota-meshi/eslint-plugin-es-x/blob/v5.0.0/docs/rules/my-no-instanceof-wrapper.md",
        },
        fixable: "code",
        schema: [],
        type: "problem",
    },

    create(context) {
        const sourceCode = context.getSourceCode()
        const targetTypes = [
            "Boolean",
            "Number",
            "String",
            "Object",
            "Function",
            "Symbol",
        ]

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
            "Program:exit"() {
                const globalScope = context.getScope()

                for (const ctorName of targetTypes) {
                    const typeName = ctorName.toLowerCase()
                    const variable = globalScope.set.get(ctorName)

                    // Skip if undefined or shadowed
                    if (variable == null || variable.defs.length > 0) {
                        continue
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
                                "Unexpected 'instanceof' operator. Use 'typeof x === \"{{typeName}}\"' instead.",
                            data: { typeName },
                            fix: (fixer) =>
                                fixer.replaceText(
                                    node,
                                    `typeof ${sourceCode.getText(
                                        node.left,
                                    )} === "${typeName}"`,
                                ),
                        })
                    }
                }
            },
        }
    },
}
