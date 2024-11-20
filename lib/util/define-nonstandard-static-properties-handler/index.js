"use strict"

const { getPropertyKeyValue } = require("../get-property-key-value")
const { ReferenceTracker, READ } = require("@eslint-community/eslint-utils")
const { getSourceCode } = require("eslint-compat-utils")

/**
 * @typedef {import("estree").MemberExpression} MemberExpression
 */

/**
 * Define handlers to disallow non-standard static global object properties.
 * @param {RuleContext} context The rule context.
 * @param {Record<string, Iterable<string>>} nameMap The property names to allow. The key is class names and that value is property names.
 * @returns {Record<string, (node: ASTNode) => void>} The defined handlers.
 */
function defineNonstandardStaticPropertiesHandler(context, nameMap) {
    const nameMapEntries = Object.entries(nameMap).map(
        ([className, propertyNames]) =>
            /** @type {const} */ ([className, new Set(propertyNames)]),
    )
    const sourceCode = getSourceCode(context)

    /**
     * @param {import("estree").Node} node
     * @param {string[]} path
     * @param {string} propertyName
     */
    function report(node, path, propertyName) {
        context.report({
            node,
            messageId: "forbidden",
            data: { name: [...path, propertyName].join(".") },
        })
    }

    /**
     * @param {ReferenceTracker} tracker
     * @param {object} traceMap
     * @param {Set<string>} propertyNames
     */
    function verifyForEntry(tracker, traceMap, propertyNames) {
        /**
         * @param {import("estree").ObjectPattern} node
         */
        function* extractNonstandardProperties(node) {
            for (const prop of node.properties) {
                if (prop.type !== "Property") {
                    continue
                }
                const propertyName = getPropertyKeyValue(
                    prop,
                    sourceCode.getScope(node),
                )
                if (
                    // If the key is a symbol, it is ignored.
                    typeof propertyName !== "string" ||
                    propertyNames.has(propertyName)
                ) {
                    continue
                }
                yield { node: prop, propertyName }
            }
        }

        for (const { node, path } of tracker.iterateGlobalReferences(
            traceMap,
        )) {
            /** @type {import("estree").Node | null} */
            const parent = node.parent
            if (!parent) {
                continue
            }
            if (parent.type === "MemberExpression") {
                if (parent.object !== node) {
                    continue
                }
                const propertyName = getPropertyKeyValue(
                    parent,
                    sourceCode.getScope(node),
                )
                if (
                    // If the key is a symbol, it is ignored.
                    typeof propertyName !== "string" ||
                    propertyNames.has(propertyName)
                ) {
                    continue
                }
                report(parent, path, propertyName)
            } else if (parent.type === "VariableDeclarator") {
                if (
                    parent.init !== node ||
                    parent.id.type !== "ObjectPattern"
                ) {
                    continue
                }
                for (const {
                    node: reportNode,
                    propertyName,
                } of extractNonstandardProperties(parent.id)) {
                    report(reportNode, path, propertyName)
                }
            } else if (
                parent.type === "AssignmentExpression" ||
                parent.type === "AssignmentPattern"
            ) {
                if (
                    parent.right !== node ||
                    parent.left.type !== "ObjectPattern"
                ) {
                    continue
                }
                for (const {
                    node: reportNode,
                    propertyName,
                } of extractNonstandardProperties(parent.left)) {
                    report(reportNode, path, propertyName)
                }
            } else {
                continue
            }
        }
    }

    return {
        "Program:exit"(program) {
            const tracker = new ReferenceTracker(sourceCode.getScope(program))
            for (const [className, propertyNames] of nameMapEntries) {
                const traceMap = {}
                let map = traceMap
                for (const name of className.split(".")) {
                    map = map[name] || (map[name] = {})
                }
                map[READ] = true
                verifyForEntry(tracker, traceMap, new Set(propertyNames))
            }
        },
    }
}

module.exports = { defineNonstandardStaticPropertiesHandler }
