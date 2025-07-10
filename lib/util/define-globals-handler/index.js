"use strict"

const { ReferenceTracker, READ } = require("@eslint-community/eslint-utils")

/**
 * @typedef {import("eslint").Rule.RuleContext} RuleContext
 */
/**
 * Define handlers to disallow global objects.
 * @param {RuleContext} context The rule context.
 * @param {string[]} names The global object names to disallow.
 * @returns {Record<string, (node: ASTNode) => void>} The defined handlers.
 */
function defineGlobalsHandler(context, names) {
    const sourceCode = context.sourceCode
    return {
        "Program:exit"(program) {
            const tracker = new ReferenceTracker(sourceCode.getScope(program))
            const traceMap = {}
            for (const className of names) {
                let map = traceMap
                for (const name of className.split(".")) {
                    map = map[name] || (map[name] = {})
                }
                map[READ] = true
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

module.exports = { defineGlobalsHandler }
