"use strict"

const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `Set.prototype.isDisjointFrom` method.",
            category: "ES2025",
            proposal: "set-methods",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-set-prototype-isdisjointfrom.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2025 '{{name}}' method is forbidden.",
        },
        schema: [
            {
                type: "object",
                properties: {
                    aggressive: { type: "boolean" },
                    allowTestedProperty: { type: "boolean" },
                },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        return definePrototypePropertiesHandler(context, {
            Set: { isDisjointFrom: "function" },
        })
    },
}
