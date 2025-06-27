"use strict"

const { buildTypeChecker } = require("eslint-type-tracer")
const { getPropertyKeyValue } = require("../get-property-key-value")
const {
    createPropertyGuardsContext,
} = require("../type-checker/property-guards")

/**
 * @typedef {import("estree").MemberExpression} MemberExpression
 * @typedef {import("estree").Property} Property
 */

/**
 * Define handlers to disallow non-standard prototype properties.
 * @param {RuleContext} context The rule context.
 * @param {Record<string, Iterable<string>>} nameMap The property names to allow. The key is class names and that value is property names.
 * @param {object} [options] The options.
 * @param {(name: string) => boolean} [options.allowsPropertyName] The function to check whether the property name is allowed.
 * @returns {Record<string, (node: ASTNode) => void>} The defined handlers.
 */
function defineNonstandardPrototypePropertiesHandler(
    context,
    nameMap,
    options,
) {
    const sourceCode = context.sourceCode

    const objectTypeChecker = buildTypeChecker(sourceCode)

    const guardsContext = createPropertyGuardsContext({ context })

    const nameMapEntries = Object.entries(nameMap).map(
        ([className, propertyNames]) => [className, new Set(propertyNames)],
    )

    function report(node, className, propertyName) {
        context.report({
            node,
            messageId: "forbidden",
            data: {
                name: `${className}.prototype.${propertyName}`,
            },
        })
    }

    /**
     * @param {MemberExpression|Property} node
     * @param {string} propertyName
     * @param {Expression} objectNode
     */
    function verifyPropertyName(node, propertyName, objectNode) {
        for (const [className, propertyNames] of nameMapEntries) {
            if (propertyNames.has(propertyName)) {
                continue
            }
            if (!objectTypeChecker(objectNode, className, node)) {
                continue
            }
            const params = {
                node,
                className,
                propertyName,
                objectNode,
            }
            if (
                !guardsContext.processGuard(params) &&
                !guardsContext.isAvailableLocation(params)
            ) {
                report(node, className, propertyName)
            }
            break
        }
    }

    return {
        MemberExpression(node) {
            const propertyName = getPropertyKeyValue(
                node,
                sourceCode.getScope(node),
            )
            if (
                // If the key is a symbol, it is ignored.
                typeof propertyName !== "string" ||
                options?.allowsPropertyName?.(propertyName)
            ) {
                return
            }
            verifyPropertyName(node, propertyName, node.object)
        },
        /** @param {import("estree").Property} node */
        [[
            "VariableDeclarator > ObjectPattern.id > Property.properties",
            "AssignmentExpression > ObjectPattern.left > Property.properties",
            "AssignmentPattern > ObjectPattern.left > Property.properties",
        ].join(",")](node) {
            const propertyName = getPropertyKeyValue(
                node,
                sourceCode.getScope(node),
            )
            if (
                // If the key is a symbol, it is ignored.
                typeof propertyName !== "string" ||
                options?.allowsPropertyName?.(propertyName)
            ) {
                return
            }
            /** @type {import("estree").VariableDeclarator | import("estree").AssignmentExpression | import("estree").AssignmentPattern} */
            const assignmentNode = node.parent.parent
            const objectNode =
                assignmentNode.type === "VariableDeclarator"
                    ? assignmentNode.init
                    : assignmentNode.right
            if (!objectNode) {
                return
            }

            verifyPropertyName(node, propertyName, objectNode)
        },
        "Program:exit"() {
            for (const unused of guardsContext.iterateUnusedGuards()) {
                report(unused.node, unused.className, unused.propertyName)
            }
        },
    }
}

module.exports = { defineNonstandardPrototypePropertiesHandler }
