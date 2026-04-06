"use strict"

const { createRule } = require("../util/create-rule")
const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = createRule({
    meta: {
        docs: {
            description:
                "disallow the `Date.prototype.toTemporalInstant` method",
            category: "ES2027",
            proposal: "temporal",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-date-prototype-totemporalinstant.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2027 '{{name}}' method is forbidden.",
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
            Date: { toTemporalInstant: "function" },
        })
    },
})
