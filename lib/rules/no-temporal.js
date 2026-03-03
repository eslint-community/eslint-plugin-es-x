"use strict"

const { defineGlobalsHandler } = require("../util/define-globals-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `Temporal` class.",
            category: "ES2026",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-temporal.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2026 '{{name}}' class is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineGlobalsHandler(context, ["Temporal"])
    },
}
