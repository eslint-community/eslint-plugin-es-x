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
 * @param {string} className The class name to check.
 * @param {Iterable<string>} propertyNames The property names to allow.
 * @param {object} [options] The options.
 * @param {(name: string) => boolean} [options.allowsPropertyName] The function to check whether the property name is allowed.
 * @returns {Record<string, (node: ASTNode) => void>} The defined handlers.
 */
function defineNonstandardPrototypePropertiesHandler(
    context,
    className,
    propertyNames,
    options,
) {
    const propertyNamesSet = new Set(propertyNames)
    const sourceCode = getSourceCode(context)

    const objectTypeChecker =
        buildObjectTypeCheckerForTS(context, false) ||
        buildObjectTypeChecker(context, false)

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
            if (
                !propertyNamesSet.has(propertyName) &&
                objectTypeChecker(node, className)
            ) {
                context.report({
                    node,
                    messageId: "forbidden",
                    data: {
                        name: `${className}.prototype.${propertyName}`,
                    },
                })
            }
        },
    }
}

module.exports = { defineNonstandardPrototypePropertiesHandler }
