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
            description: "Disallow `this`/`super` in static methods",
            category: "Best Practices",
            url: "https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/docs/rules/my-no-this-in-static.md",
        },
        fixable: null,
        schema: [],
        type: "suggestion",
    },

    create(context) {
        const sourceCode = context.getSourceCode()
        let funcInfo = null

        /**
         * Checks whether the given function node is a static method or not.
         *
         * @param {ASTNode} node - The function node to check.
         * @returns {boolean} `true` if the node is a static method.
         */
        function isStaticMethod(node) {
            return (
                node.type === "FunctionExpression" &&
                node.parent.type === "MethodDefinition" &&
                node.parent.static === true
            )
        }

        /**
         * Updates the stack of function information.
         *
         * @param {ASTNode} node - The function node to make information.
         * @returns {void}
         */
        function enterFunction(node) {
            funcInfo = {
                upper: funcInfo,
                static: isStaticMethod(node),
            }
        }

        /**
         * Updates the stack of function information.
         *
         * @returns {void}
         */
        function exitFunction() {
            funcInfo = funcInfo.upper
        }

        /**
         * Reports the `this`/`super` node if this is inside of a static method.
         *
         * @param {ASTNode} node - The node to report.
         * @returns {void}
         */
        function reportIfStatic(node) {
            if (funcInfo != null && funcInfo.static) {
                context.report({
                    node,
                    loc: node.loc,
                    message: "Unexpected '{{type}}'.",
                    data: { type: sourceCode.getText(node) },
                })
            }
        }

        return {
            FunctionDeclaration: enterFunction,
            FunctionExpression: enterFunction,
            "FunctionDeclaration:exit": exitFunction,
            "FunctionExpression:exit": exitFunction,
            ThisExpression: reportIfStatic,
            Super: reportIfStatic,
        }
    },
}
