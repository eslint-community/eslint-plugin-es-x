"use strict"

const {
    getPropertyName,
    getStaticValue,
} = require("@eslint-community/eslint-utils")
const { getSourceCode } = require("eslint-compat-utils")

/**
 * @typedef {import("estree").Node} Node
 * @typedef {import("estree").Property} Property
 * @typedef {import("estree").ObjectExpression} ObjectExpression
 * @typedef {import("eslint").Rule.RuleContext} RuleContext
 */

/**
 * @param {RuleContext} context
 * @param {(propertiesNode: ObjectExpression) => void} check
 */
function defineSchemaChecker(context, check) {
    const sourceCode = getSourceCode(context)
    return {
        // eslint-disable-next-line complexity
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
            const metaNode = getProperty(right, "meta")?.value
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
                getStaticValue(typeNode, sourceCode.getScope(typeNode))
                    ?.value !== "object"
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
