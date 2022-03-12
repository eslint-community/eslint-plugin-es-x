/**
 * @fileoverview Rule to disallow unnecessary spread operators.
 * @author Toru Nagashima
 */
"use strict"

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const FUNC_TYPE =
    /^(?:FunctionDeclaration|(?:New|Call|(?:Arrow)?Function)Expression)$/u
const PROPERTY_PATTERN = /^(?:Experimental)?(Rest|Spread)Property$/u

/**
 * Checks whether the given token is a comma.
 *
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a comma.
 */
function isCommaToken(token) {
    return token.type === "Punctuator" && token.value === ","
}

/**
 * Check whether a given node is a hole.
 * @param {ASTNode|null} element The node to check.
 * @returns {boolean} `true` if the node is a hole.
 */
function isHole(element) {
    return element == null
}

/**
 * Gets the last token of the given node's elements.
 * This skips trailing commas.
 *
 * @param {SourceCode} sourceCode - The source code object to get tokens.
 * @param {ASTNode} node - The node to get. This is one of ArrayExpression,
 * ArrayPattern, ObjectExpression, and ObjectPattern.
 * @returns {Token} The last element token.
 */
function getLastElementToken(sourceCode, node) {
    const token = sourceCode.getLastToken(node, 1)

    if (isCommaToken(token)) {
        return sourceCode.getTokenBefore(token)
    }
    return token
}

/**
 * Defines a fixer function.
 *
 * @param {SourceCode} sourceCode - The source code object to get tokens.
 * @param {ASTNode} node - A node to fix.
 * @returns {function} A fixer function.
 */
function defineFixer(sourceCode, node) {
    return (fixer) => {
        const child = node.argument

        // If the inner array includes holes, do nothing.
        if (child.elements != null && child.elements.some(isHole)) {
            return null
        }

        // Remove this element if it's empty.
        if ((child.elements || child.properties).length === 0) {
            const next = sourceCode.getTokenAfter(node)
            if (isCommaToken(next)) {
                return fixer.removeRange([node.range[0], next.range[1]])
            }

            const prev = sourceCode.getTokenBefore(node)
            if (isCommaToken(prev)) {
                return fixer.removeRange([prev.range[0], node.range[1]])
            }

            return fixer.remove(node)
        }

        // Unwrap.
        const first = sourceCode.getFirstToken(child, 1)
        const last = getLastElementToken(sourceCode, child)
        const replaceText = sourceCode.text.slice(first.range[0], last.range[1])
        return fixer.replaceText(node, replaceText)
    }
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Disallow unnecessary spread operators.",
            category: "Best Practices",
            recommended: false,
            url: "https://github.com/ota-meshi/eslint-plugin-es-x/blob/v4.1.0/docs/rules/my-no-useless-rest-spread.md",
        },
        fixable: "code",
        schema: [],
        type: "suggestion",
    },

    create(context) {
        const sourceCode = context.getSourceCode()

        /**
         * Verify the given SpreadElement or RestElement.
         * @param {ASTNode} node The node to verify.
         * @returns {void}
         */
        function verify(node) {
            const nodeType = node.type.replace(
                PROPERTY_PATTERN,
                (t) => `${t}Element`,
            )
            const parentType = node.parent.type
            const argumentType = node.argument.type
            const isArray = argumentType.startsWith("Array")
            const isObject = !isArray && argumentType.startsWith("Object")
            const isRedundant =
                ((isArray || isObject) && argumentType === parentType) ||
                (isArray && FUNC_TYPE.test(parentType))

            if (isRedundant) {
                const isRestParameter =
                    nodeType === "RestElement" && argumentType !== parentType
                const type1 = nodeType === "RestElement" ? "rest" : "spread"
                const type2 = isRestParameter
                    ? "parameter"
                    : isArray
                    ? "element"
                    : /* otherwise */ "property"

                context.report({
                    node,
                    message: "Redundant {{type1}} {{type2}}.",
                    data: { type1, type2 },
                    fix: defineFixer(sourceCode, node),
                })
            }
        }

        return {
            SpreadElement: verify,
            RestElement: verify,

            // Legacy for espree and babel-eslint.
            // SpreadProperty and RestProperty were replaced by SpreadElement and RestElement.
            SpreadProperty: verify,
            RestProperty: verify,
            ExperimentalSpreadProperty: verify,
            ExperimentalRestProperty: verify,
        }
    },
}
