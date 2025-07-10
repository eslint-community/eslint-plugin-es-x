"use strict"

const { getPropertyName } = require("@eslint-community/eslint-utils")
const {
    createPropertyGuardsContext,
} = require("../type-checker/property-guards")

const { buildTypeChecker } = require("eslint-type-tracer")

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
 * @typedef {import('../type-checker/property-guards').PropertyType} PropertyType
 * @typedef {import('../type-checker/property-guards').PropertyTypeMap} PropertyTypeMap
 */

/**
 * Define handlers to disallow prototype properties.
 * @param {RuleContext} context The rule context.
 * @param {PropertyTypeMap} propertyTypeMap The property names to disallow. The key is class names and that value is properties and types.
 * @param {Options} [options] The options.
 * @returns {Record<string, (node: Node) => void>} The defined handlers.
 */
function definePrototypePropertiesHandler(context, propertyTypeMap, options) {
    const sourceCode = context.sourceCode
    const aggressiveOption = getAggressiveOption(context)

    const objectTypeChecker = buildTypeChecker(sourceCode, {
        aggressive: aggressiveOption,
    })

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

    const guardsContext = createPropertyGuardsContext({
        context,
        propertyTypeMap,
    })

    const propertyEntries = Object.entries(propertyTypeMap).map(
        ([className, properties]) =>
            /** @type {const} */ ([className, Object.keys(properties)]),
    )

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
        const objectTypeResult = objectTypeChecker(objectNode, className, node)
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
            if (!properties.includes(propertyName)) {
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
            if (!properties.includes(propertyName)) {
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
