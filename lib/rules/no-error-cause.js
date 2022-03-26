/**
 * @author Sosuke Suzuki <https://github.com/sosukesuzuki>
 * See LICENSE file in root directory for full license.
 */

"use strict"

const { CONSTRUCT, READ, ReferenceTracker } = require("eslint-utils")

/**
 * @typedef {import("estree")} Node
 * @typedef {import("estree").ClassExpression | import("estree").ClassDeclaration} ClassNode
 * @typedef {import("estree").CallExpression} CallExpression
 */

const errorConstructorNames = [
    "Error",
    "AggregateError",
    "EvalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError",
]
const traceMap = {}
for (const errorConstructorName of errorConstructorNames) {
    traceMap[errorConstructorName] = { [CONSTRUCT]: true, [READ]: true }
}

/**
 * @param {Node} node
 * @returns {boolean}
 */
function isSuperCall(node) {
    return node.type === "CallExpression" && node.callee.type === "Super"
}

/**
 * Checks if the received node is a construcotr call with cause option.
 * e.g. `new Error("message", { cause: foo })`, `super("message", { cause: foo })`
 *
 * @param {Node} node
 * @returns {boolean}
 */
function isConstructCallWithCauseOption(node) {
    if (node.type !== "NewExpression" && !isSuperCall(node)) {
        return false
    }
    const secondArg = node.arguments[1]
    if (!secondArg || secondArg.type !== "ObjectExpression") {
        return false
    }
    return secondArg.properties.some((property) => {
        if (property.type !== "Property") {
            return false
        }
        // new Error("msg", { ["cause"]: foo })
        if (
            property.computed &&
            property.key.type === "Literal" &&
            property.key.value === "cause"
        ) {
            return true
        }
        // new Error("msg", { cause: foo })
        return property.key.name === "cause"
    })
}

/**
 * @param {Node} node
 * @returns {ClassNode | null}
 */
function findClassFromAncestors(node) {
    if (node.type !== "ClassExpression" && node.type !== "ClassDeclaration") {
        return findClassFromAncestors(node.parent)
    }
    if (!node) {
        return null
    }
    return node
}

module.exports = {
    meta: {
        docs: {
            description: "disallow Erroc Cause.",
            category: "ES2022",
            recommended: false,
            url: "http://ota-meshi.github.io/eslint-plugin-es-x/rules/no-error-cause.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2022 Error Cause is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        /** @type {Array<{ classNode: ClassNode, superCallNode: CallExpression }>} */
        const maybeErrorSubclasses = []

        /**
         * @param {Node} node
         * @return {Node | null}
         */
        function getReportedNode(node) {
            if (maybeErrorSubclasses.length > 0) {
                for (const {
                    classNode,
                    superCallNode,
                } of maybeErrorSubclasses) {
                    if (classNode.superClass === node) {
                        return superCallNode
                    }
                }
            }
            if (isConstructCallWithCauseOption(node)) {
                return node
            }
            return null
        }

        return {
            Super(node) {
                const superCallNode = node.parent
                if (isConstructCallWithCauseOption(superCallNode)) {
                    const classNode = findClassFromAncestors(superCallNode)
                    if (classNode && classNode.superClass) {
                        maybeErrorSubclasses.push({ classNode, superCallNode })
                    }
                }
            },
            "Program:exit"() {
                const tracker = new ReferenceTracker(context.getScope())
                for (const { node } of tracker.iterateGlobalReferences(
                    traceMap,
                )) {
                    const reportedNode = getReportedNode(node)
                    if (reportedNode) {
                        context.report({
                            node: reportedNode,
                            messageId: "forbidden",
                        })
                    }
                }
            },
        }
    },
}
