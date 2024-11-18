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
 * @typedef {import("estree").Property} Property
 * @typedef {import("estree").Expression} Expression
 * @typedef {import("estree").Node} Node
 * @typedef {import("eslint").Rule.RuleContext} RuleContext
 * @typedef {import("eslint").Rule.ReportDescriptor} ReportDescriptor
 */
/**
 * @typedef {object} CreateReportArgument
 * @property {true | 'aggressive'} objectTypeResult
 * @property {string} className
 * @property {string} propertyName
 * @property {MemberExpression|Property} node
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
 * @returns {Record<string, (node: Node) => void>} The defined handlers.
 */
function definePrototypeMethodHandler(context, nameMap, options) {
    const sourceCode = getSourceCode(context)
    const aggressiveOption = getAggressiveOption(context)
    const aggressiveResult = aggressiveOption ? "aggressive" : false

    const objectTypeChecker =
        buildObjectTypeCheckerForTS(context, aggressiveResult) ||
        buildObjectTypeChecker(context, aggressiveResult)

    /**
     * @param {MemberExpression|Property} node
     * @param {string} className
     * @param {string} propertyName
     * @param {true | "aggressive"} objectTypeResult
     */
    function report(node, className, propertyName, objectTypeResult) {
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

    const nameMapEntries = Object.entries(nameMap)
    /**
     * @param {MemberExpression|Property} node
     * @param {string} propertyName
     * @param {Expression} objectNode
     */
    // eslint-disable-next-line func-style
    let verifyPropertyName = (node, propertyName, objectNode) => {
        for (const [className, methodNames] of nameMapEntries) {
            let objectTypeResult = undefined
            if (
                methodNames.includes(propertyName) &&
                (objectTypeResult = objectTypeChecker(
                    node,
                    objectNode,
                    className,
                ))
            ) {
                report(node, className, propertyName, objectTypeResult)
                return
            }
        }
    }
    if (nameMapEntries.length === 1) {
        // For performance
        const [[className, methodNames]] = nameMapEntries
        verifyPropertyName = (node, propertyName, objectNode) => {
            let objectTypeResult = undefined
            if (
                methodNames.includes(propertyName) &&
                (objectTypeResult = objectTypeChecker(
                    node,
                    objectNode,
                    className,
                ))
            ) {
                report(node, className, propertyName, objectTypeResult)
            }
        }
    }

    return {
        /** @param {MemberExpression} node */
        MemberExpression(node) {
            const propertyName = getPropertyName(
                node,
                sourceCode.getScope(node),
            )
            if (propertyName == null) {
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
            const propertyName = getPropertyName(
                node,
                sourceCode.getScope(node),
            )
            if (propertyName == null) {
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
