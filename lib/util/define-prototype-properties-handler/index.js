"use strict"

const { getPropertyName } = require("@eslint-community/eslint-utils")
const {
    buildObjectTypeChecker,
} = require("../type-checker/object-type-checker")
const {
    buildObjectTypeCheckerForTS,
} = require("../type-checker/object-type-checker-for-ts")
const { createGuardsContext } = require("../type-checker/guards")
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
 * @typedef {import('../type-checker/guards').PropertyType} PropertyType
 * @typedef {import('../type-checker/guards').PropertyTypeMap} PropertyTypeMap
 */

/**
 * Define handlers to disallow prototype properties.
 * @param {RuleContext} context The rule context.
 * @param {PropertyTypeMap} propertyTypeMap The property names to disallow. The key is class names and that value is properties and types.
 * @param {Options} [options] The options.
 * @returns {Record<string, (node: Node) => void>} The defined handlers.
 */
function definePrototypePropertiesHandler(context, propertyTypeMap, options) {
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

    const guardsContext = createGuardsContext({
        context,
        propertyTypeMap,
    })

    const propertyEntries = Object.entries(propertyTypeMap)

    /**
     * @param {MemberExpression|Property} node
     * @param {string} className
     * @param {string} propertyName
     * @param {Expression} objectNode
     */
    function verifyClassPropertyName(
        node,
        className,
        propertyName,
        objectNode,
    ) {
        const objectTypeResult = objectTypeChecker(node, objectNode, className)
        if (!objectTypeResult) {
            return false
        }

        const params = {
            node,
            className,
            propertyName,
            objectNode,
            objectTypeResult,
        }
        if (
            !guardsContext.processGuard(params) &&
            !guardsContext.isAvailableLocation(params)
        ) {
            report(node, className, propertyName, objectTypeResult)
        }
        return true
    }

    /**
     * @param {MemberExpression|Property} node
     * @param {string} propertyName
     * @param {Expression} objectNode
     */
    // eslint-disable-next-line func-style
    let verifyPropertyName = (node, propertyName, objectNode) => {
        for (const [className, properties] of propertyEntries) {
            if (!properties[propertyName]) {
                continue
            }
            if (
                verifyClassPropertyName(
                    node,
                    className,
                    propertyName,
                    objectNode,
                )
            ) {
                return
            }
        }
    }
    if (propertyEntries.length === 1) {
        // For performance
        const [[className, properties]] = propertyEntries
        verifyPropertyName = (node, propertyName, objectNode) => {
            if (!properties[propertyName]) {
                return
            }
            verifyClassPropertyName(node, className, propertyName, objectNode)
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
        "Program:exit"() {
            for (const unused of guardsContext.iterateUnusedGuards()) {
                report(
                    unused.node,
                    unused.className,
                    unused.propertyName,
                    unused.objectTypeResult,
                )
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

module.exports = { definePrototypePropertiesHandler }
