"use strict"

const { createRule } = require("../util/create-rule")
const { defineGlobalsHandler } = require("../util/define-globals-handler")

module.exports = createRule({
    meta: {
        docs: {
            description: "disallow the `AsyncDisposableStack` class.",
            category: "ES2026",
            proposal: "explicit-resource-management",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-asyncdisposablestack.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2026 '{{name}}' class is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineGlobalsHandler(context, ["AsyncDisposableStack"])
    },
})
