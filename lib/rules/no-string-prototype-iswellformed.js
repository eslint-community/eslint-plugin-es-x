"use strict"

const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = {
    meta: {
        docs: {
            description:
                "disallow the `String.prototype.isWellFormed` methods.",
            category: "ES2024",
            recommended: false,
            proposal: "is-usv-string",
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-string-prototype-iswellformed.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2024 '{{name}}' method is forbidden.",
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
            String: { isWellFormed: "function" },
        })
    },
}
