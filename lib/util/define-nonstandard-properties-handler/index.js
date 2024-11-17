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
    return {
        "Program:exit"(program) {
            const sourceCode = getSourceCode(context)
            const tracker = new ReferenceTracker(sourceCode.getScope(program))
            for (const { node, path } of tracker.iterateGlobalReferences(
                traceMap,
            )) {
                if (
                    node.parent.type !== "MemberExpression" ||
                    node.parent.object !== node
                ) {
                    continue
                }
                const propertyName = getPropertyName(
                    node.parent,
                    sourceCode.getScope(node),
                )
                if (
                    propertyName == null ||
                    propertyNamesSet.has(propertyName)
                ) {
                    continue
                }

                context.report({
                    node,
                    messageId: "forbidden",
                    data: { name: [...path, propertyName].join(".") },
                })
            }
        },
    }
}

module.exports = { defineNonstandardPropertiesHandler }
