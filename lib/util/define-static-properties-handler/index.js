"use strict"

const { ReferenceTracker, READ } = require("@eslint-community/eslint-utils")

const {
    createPropertyGuardsContext,
} = require("../type-checker/property-guards")

/**
 * @typedef {import("estree").MemberExpression} MemberExpression
 * @typedef {import("estree").Property} Property
 * @typedef {import("eslint").Rule.RuleContext} RuleContext
 */

/**
 * @typedef {import('../type-checker/property-guards').PropertyType} PropertyType
 * @typedef {import('../type-checker/property-guards').PropertyTypeMap} PropertyTypeMap
 */
/**
 * Define handlers to disallow static properties.
 * @param {RuleContext} context The rule context.
 * @param {PropertyTypeMap} propertyTypeMap The property names to disallow. The key is class names and that value is properties and types.
 * @returns {Record<string, (node: ASTNode) => void>} The defined handlers.
 */
function defineStaticPropertiesHandler(context, propertyTypeMap) {
    const sourceCode = context.sourceCode

    const guardsContext = createPropertyGuardsContext({
        context,
        propertyTypeMap,
    })
    return {
        "Program:exit"(program) {
            const tracker = new ReferenceTracker(sourceCode.getScope(program))
            const traceMap = {}
            for (const [className, properties] of Object.entries(
                propertyTypeMap,
            )) {
                let map = traceMap
                for (const name of className.split(".")) {
                    map = map[name] || (map[name] = {})
                }
                for (const propertyName of Object.keys(properties)) {
                    map[propertyName] = { [READ]: true }
                }
            }
            for (const { node, path } of tracker.iterateGlobalReferences(
                traceMap,
            )) {
                const params = {
                    node,
                    className: path.slice(0, -1).join("."),
                    propertyName: path.at(-1),
                    objectNode: getObjectNode(node),
                }
                if (
                    !params.objectNode ||
                    (!guardsContext.processGuard(params) &&
                        !guardsContext.isAvailableLocation(params))
                ) {
                    context.report({
                        node,
                        messageId: "forbidden",
                        data: { name: path.join(".") },
                    })
                }
            }
            for (const unused of guardsContext.iterateUnusedGuards()) {
                context.report({
                    node: unused.node,
                    messageId: "forbidden",
                    data: {
                        name: `${unused.className}.${unused.propertyName}`,
                    },
                })
            }
        },
    }
}

module.exports = { defineStaticPropertiesHandler }

/**
 * @param {MemberExpression|Property} node
 */
function getObjectNode(node) {
    if (node.type === "MemberExpression") {
        return node.object
    }
    if (
        node.type === "Property" &&
        node.parent?.type === "ObjectPattern" &&
        node.parent.parent
    ) {
        if (node.parent.parent.type === "VariableDeclarator") {
            return node.parent.parent.init
        }
        if (node.parent.parent.type === "AssignmentPattern") {
            return node.parent.parent.right
        }
        if (node.parent.parent.type === "AssignmentExpression") {
            return node.parent.parent.right
        }
    }
    return null
}
