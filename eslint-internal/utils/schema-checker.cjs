"use strict"

const {
    getPropertyName,
    getStaticValue,
} = require("@eslint-community/eslint-utils")

/**
 * @typedef {import("estree").Node} Node
 * @typedef {import("estree").Property} Property
 * @typedef {import("estree").ObjectExpression} ObjectExpression
 * @typedef {import("estree").SimpleCallExpression} CallExpression
 * @typedef {import("eslint").Rule.RuleContext} RuleContext
 */

/**
 * @param {RuleContext} context
 * @param {(propertiesNode: ObjectExpression) => void} check
 */
function defineSchemaChecker(context, check) {
    const sourceCode = context.sourceCode

    /** @param {ObjectExpression} node  */
    // eslint-disable-next-line complexity
    function visitRuleObject(node) {
        if (node.type !== "ObjectExpression") {
            return
        }
        const metaNode = getProperty(node, "meta")?.value
        if (!metaNode || metaNode.type !== "ObjectExpression") {
            return
        }
        const schemaArray = getProperty(metaNode, "schema")?.value
        if (!schemaArray || schemaArray.type !== "ArrayExpression") {
            context.report({
                node: schemaArray || metaNode,
                message: "The schema must be an array.",
            })
            return
        }
        const schema = schemaArray.elements[0]
        if (!schema || schema.type !== "ObjectExpression") {
            context.report({
                node: schema || schemaArray,
                message: "The schema must be an object.",
                fix(fixer) {
                    return !schema
                        ? fixer.replaceText(
                              schemaArray,
                              '[{ type: "object",properties: {},additionalProperties: false,}]',
                          )
                        : null
                },
            })
            return
        }
        const typeNode = getProperty(schema, "type")?.value
        if (
            !typeNode ||
            getStaticValue(typeNode, sourceCode.getScope(typeNode))?.value !==
                "object"
        ) {
            context.report({
                node: typeNode || schema,
                message: "The schema must have the type object property.",
            })
            return
        }

        const propertiesNode = getProperty(schema, "properties")?.value
        if (!propertiesNode || propertiesNode.type !== "ObjectExpression") {
            context.report({
                node: schema,
                message: "The schema must have the properties property.",
            })
            return
        }

        check(propertiesNode)
    }

    return {
        /** @param {CallExpression} node  */
        CallExpression(node) {
            if (
                node.callee.type !== "Identifier" ||
                node.callee.name !== "createRule"
            ) {
                return
            }
            const ruleObject = node.arguments[0]
            if (!ruleObject || ruleObject.type !== "ObjectExpression") {
                return
            }
            visitRuleObject(ruleObject)
        },
        MemberExpression(node) {
            if (
                node.object.type !== "Identifier" ||
                node.object.name !== "module" ||
                getPropertyName(node) !== "exports"
            ) {
                return
            }
            /** @type {Node|null} */
            const parent = node.parent
            if (parent?.type !== "AssignmentExpression") {
                return
            }
            const right = parent.right
            if (right.type !== "ObjectExpression") {
                return
            }
            visitRuleObject(right)
        },
    }
}

module.exports = { defineSchemaChecker, getProperty }

/**
 * @param {import("estree").ObjectExpression} node
 * @param {string} name
 * @returns {import("estree").Property|undefined}
 */
function getProperty(node, name) {
    return node.properties.find(
        (property) =>
            property.type === "Property" && property.key.name === name,
    )
}
