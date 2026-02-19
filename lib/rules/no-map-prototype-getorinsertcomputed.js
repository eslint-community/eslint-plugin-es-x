"use strict"

const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = {
    meta: {
        docs: {
            description:
                "disallow the `Map.prototype.getOrInsertComputed` method.",
            category: "ES2026",
            proposal: "upsert",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-map-prototype-getorinsertcomputed.html",
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
            Map: { getOrInsertComputed: "function" },
        })
    },
}
