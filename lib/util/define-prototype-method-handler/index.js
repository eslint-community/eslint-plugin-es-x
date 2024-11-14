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
 * @typedef {object} CreateReportArgument
 * @property {true | 'aggressive'} objectTypeResult
 * @property {string} className
 * @property {string} propertyName
 * @property {MemberExpression} node
 */
/**
 * @typedef {object} Options
 * @property { (arg: CreateReportArgument) => ReportDescriptor } [Options.createReport]
 */

/**
 * Define handlers to disallow prototype methods.
 * @param {RuleContext} context The rule context.
 * @param {Record<string, readonly string[]>} nameMap The method names to disallow. The key is class names and that value is method names.
 * @param {Options} [options] The options.
 * @returns {Record<string, (node: ASTNode) => void>} The defined handlers.
 */
function definePrototypeMethodHandler(context, nameMap, options) {
    const sourceCode = getSourceCode(context)
    const aggressiveOption = getAggressiveOption(context)
    const aggressiveResult = aggressiveOption ? "aggressive" : false

    const objectTypeChecker =
        buildObjectTypeCheckerForTS(context, aggressiveResult) ||
        buildObjectTypeChecker(context, aggressiveResult)

    // For performance
    const nameMapEntries = Object.entries(nameMap)
    if (nameMapEntries.length === 1) {
        const [[className, methodNames]] = nameMapEntries
        return {
            MemberExpression(node) {
                const propertyName = getPropertyName(
                    node,
                    sourceCode.getScope(node),
                )
                let objectTypeResult = undefined
                if (
                    methodNames.includes(propertyName) &&
                    (objectTypeResult = objectTypeChecker(node, className))
                ) {
                    context.report({
                        node,
                        messageId: "forbidden",
                        data: {
                            name: `${className}.prototype.${propertyName}`,
                        },
                        ...((options &&
                            options.createReport &&
                            options.createReport({
                                objectTypeResult,
                                className,
                                propertyName,
                                node,
                            })) ||
                            {}),
                    })
                }
            },
        }
    }

    return {
        MemberExpression(node) {
            const propertyName = getPropertyName(
                node,
                sourceCode.getScope(node),
            )
            for (const [className, methodNames] of nameMapEntries) {
                let objectTypeResult = undefined
                if (
                    methodNames.includes(propertyName) &&
                    (objectTypeResult = objectTypeChecker(node, className))
                ) {
                    context.report({
                        node,
                        messageId: "forbidden",
                        data: {
                            name: `${className}.prototype.${propertyName}`,
                        },
                        ...((options &&
                            options.createReport &&
                            options.createReport({
                                objectTypeResult,
                                className,
                                propertyName,
                                node,
                            })) ||
                            {}),
                    })
                    return
                }
            }
        },
    }
}

/**
 * Get `aggressive` option value.
 * @param {RuleContext} context The rule context.
 * @returns {boolean} The gotten `aggressive` option value.
 */
function getAggressiveOption(context) {
    const options = context.options[0]
    const globalOptions = context.settings["es-x"]

    if (options && typeof options.aggressive === "boolean") {
        return options.aggressive
    }
    if (globalOptions && typeof globalOptions.aggressive === "boolean") {
        return globalOptions.aggressive
    }

    return false
}

module.exports = { definePrototypeMethodHandler }
