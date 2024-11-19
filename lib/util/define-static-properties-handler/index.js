"use strict"

const { ReferenceTracker, READ } = require("@eslint-community/eslint-utils")
const { getSourceCode } = require("eslint-compat-utils")

/**
 * @typedef {import("eslint").Rule.RuleContext} RuleContext
 */
/**
 * Define handlers to disallow static properties.
 * @param {RuleContext} context The rule context.
 * @param {Record<string, readonly string[]>} nameMap The property names to disallow. The key is class names and that value is property names.
 * @returns {Record<string, (node: ASTNode) => void>} The defined handlers.
 */
function defineStaticPropertiesHandler(context, nameMap) {
    const sourceCode = getSourceCode(context)
    return {
        "Program:exit"(program) {
            const tracker = new ReferenceTracker(sourceCode.getScope(program))
            const traceMap = {}
            for (const [className, propertyNames] of Object.entries(nameMap)) {
                let map = traceMap
                for (const name of className.split(".")) {
                    map = map[name] || (map[name] = {})
                }
                for (const propertyName of propertyNames) {
                    map[propertyName] = { [READ]: true }
                }
            }
            for (const { node, path } of tracker.iterateGlobalReferences(
                traceMap,
            )) {
                context.report({
                    node,
                    messageId: "forbidden",
                    data: { name: path.join(".") },
                })
            }
        },
    }
}

module.exports = { defineStaticPropertiesHandler }
