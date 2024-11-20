"use strict"

const { getPropertyName } = require("@eslint-community/eslint-utils")
const {
    buildObjectTypeChecker,
} = require("../type-checker/object-type-checker")
const {
    buildObjectTypeCheckerForTS,
} = require("../type-checker/object-type-checker-for-ts")
const { getSourceCode } = require("eslint-compat-utils")

/**
 * @typedef {import("estree").MemberExpression} MemberExpression
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
    const sourceCode = getSourceCode(context)

    const objectTypeChecker =
        buildObjectTypeCheckerForTS(context, false) ||
        buildObjectTypeChecker(context, false)

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

    return {
        MemberExpression(node) {
            const propertyName = getPropertyName(
                node,
                sourceCode.getScope(node),
            )
            if (
                propertyName == null ||
                options?.allowsPropertyName?.(propertyName)
            ) {
                return
            }
            for (const [className, propertyNames] of nameMapEntries) {
                if (propertyNames.has(propertyName)) {
                    continue
                }
                if (!objectTypeChecker(node, node.object, className)) {
                    continue
                }
                report(node, className, propertyName)
                break
            }
        },
        /** @param {import("estree").Property} node */
        [[
            "VariableDeclarator > ObjectPattern.id > Property.properties",
            "AssignmentExpression > ObjectPattern.left > Property.properties",
            "AssignmentPattern > ObjectPattern.left > Property.properties",
        ].join(",")](node) {
            const propertyName = getPropertyName(
                node,
                sourceCode.getScope(node),
            )
            if (
                propertyName == null ||
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

            for (const [className, propertyNames] of nameMapEntries) {
                if (propertyNames.has(propertyName)) {
                    continue
                }
                if (!objectTypeChecker(node, objectNode, className)) {
                    continue
                }
                report(node, className, propertyName)
                break
            }
        },
    }
}

module.exports = { defineNonstandardPrototypePropertiesHandler }
