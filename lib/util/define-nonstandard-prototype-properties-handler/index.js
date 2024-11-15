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
 * @param {string|string[]} classNameOrClassNames The class name to check.
 * @param {Iterable<string>} propertyNames The property names to allow.
 * @param {object} [options] The options.
 * @param {(name: string) => boolean} [options.allowsPropertyName] The function to check whether the property name is allowed.
 * @returns {Record<string, (node: ASTNode) => void>} The defined handlers.
 */
function defineNonstandardPrototypePropertiesHandler(
    context,
    classNameOrClassNames,
    propertyNames,
    options,
) {
    const propertyNamesSet = new Set(propertyNames)
    const sourceCode = getSourceCode(context)

    const objectTypeChecker =
        buildObjectTypeCheckerForTS(context, false) ||
        buildObjectTypeChecker(context, false)

    const classNames = Array.isArray(classNameOrClassNames)
        ? classNameOrClassNames
        : [classNameOrClassNames]
    return {
        MemberExpression(node) {
            const propertyName = getPropertyName(
                node,
                sourceCode.getScope(node),
            )
            if (
                propertyName == null ||
                options?.allowsPropertyName?.(propertyName) ||
                propertyNamesSet.has(propertyName)
            ) {
                return
            }
            for (const className of classNames) {
                if (!objectTypeChecker(node, className)) {
                    continue
                }
                context.report({
                    node,
                    messageId: "forbidden",
                    data: {
                        name: `${className}.prototype.${propertyName}`,
                    },
                })
                break
            }
        },
    }
}

module.exports = { defineNonstandardPrototypePropertiesHandler }
