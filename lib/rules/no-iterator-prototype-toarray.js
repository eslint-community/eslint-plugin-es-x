"use strict"

const {
    definePrototypeMethodHandler,
} = require("../util/define-prototype-method-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `Iterator.prototype.toArray` method.",
            category: "ES2025",
            proposal: "iterator-helpers",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-iterator-prototype-toarray.html",
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
                },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        return definePrototypeMethodHandler(context, {
            Iterator: ["toArray"],
        })
    },
}
