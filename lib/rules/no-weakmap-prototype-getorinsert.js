"use strict"

const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `WeakMap.prototype.getOrInsert` method.",
            category: "ES2026",
            proposal: "upsert",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-weakmap-prototype-getorinsert.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2026 '{{name}}' method is forbidden.",
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
            WeakMap: { getOrInsert: "function" },
        })
    },
}
