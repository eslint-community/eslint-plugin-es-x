"use strict"

const {
    getPropertyName,
    ReferenceTracker,
    READ,
} = require("@eslint-community/eslint-utils")
const { getSourceCode } = require("eslint-compat-utils")

/**
 * @typedef {import("estree").MemberExpression} MemberExpression
 */

/**
 * Define handlers to disallow non-standard global object properties.
 * @param {RuleContext} context The rule context.
 * @param {string|string[]} objectNameOrObjectNames The class name to check.
 * @param {Iterable<string>} propertyNames The property names to allow.
 * @returns {Record<string, (node: ASTNode) => void>} The defined handlers.
 */
function defineNonstandardPropertiesHandler(
    context,
    objectNameOrObjectNames,
    propertyNames,
) {
    const propertyNamesSet = new Set(propertyNames)

    const classNames = Array.isArray(objectNameOrObjectNames)
        ? objectNameOrObjectNames
        : [objectNameOrObjectNames]
    const traceMap = {}
    for (const className of classNames) {
        let map = traceMap
        for (const name of className.split(".")) {
            map = map[name] || (map[name] = {})
        }
        map[READ] = true
    }
    const sourceCode = getSourceCode(context)

    /**
     * @param {import("estree").ObjectPattern} node
     */
    function* extractNonstandardProperties(node) {
        for (const prop of node.properties) {
            if (prop.type !== "Property") {
                continue
            }
            const propertyName = getPropertyName(
                prop,
                sourceCode.getScope(node),
            )
            if (propertyName == null || propertyNamesSet.has(propertyName)) {
                continue
            }
            yield { node: prop, propertyName }
        }
    }

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

    return {
        "Program:exit"(program) {
            const tracker = new ReferenceTracker(sourceCode.getScope(program))
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
                    const propertyName = getPropertyName(
                        parent,
                        sourceCode.getScope(node),
                    )
                    if (
                        propertyName == null ||
                        propertyNamesSet.has(propertyName)
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
        },
    }
}

module.exports = { defineNonstandardPropertiesHandler }
