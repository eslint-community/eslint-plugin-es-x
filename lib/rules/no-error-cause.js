/**
 * @author Sosuke Suzuki <https://github.com/sosukesuzuki>
 * See LICENSE file in root directory for full license.
 */

"use strict"

const { CONSTRUCT, ReferenceTracker } = require("eslint-utils")

const traceMap = {}
for (const errorConstructorName of ["Error", "AggregateError"]) {
    traceMap[errorConstructorName] = { [CONSTRUCT]: true }
}

/**
 * @param {import("estree").Node} node
 * @returns {boolean}
 */
function shouldReport(node) {
    if (node.type !== "NewExpression") {
        return false
    }
    const secondArg = node.arguments[1]
    if (!secondArg || secondArg.type !== "ObjectExpression") {
        return false
    }
    return secondArg.properties.some((property) => {
        if (property.type !== "Property") {
            return false
        }
        // new Error("msg", { ["cause"]: foo })
        if (
            property.computed &&
            property.key.type === "Literal" &&
            property.key.value === "cause"
        ) {
            return true
        }
        // new Error("msg", { cause: foo })
        return property.key.name === "cause"
    })
}

module.exports = {
    meta: {
        docs: {
            description: "disallow Erroc Cause.",
            category: "ES2022",
            recommended: false,
            url: "http://ota-meshi.github.io/eslint-plugin-es-x/rules/no-error-cause.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2022 Error Cause is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            "Program:exit"() {
                const tracker = new ReferenceTracker(context.getScope())
                for (const { node } of tracker.iterateGlobalReferences(
                    traceMap,
                )) {
                    if (shouldReport(node)) {
                        context.report({
                            node,
                            messageId: "forbidden",
                        })
                    }
                }
            },
        }
    },
}
