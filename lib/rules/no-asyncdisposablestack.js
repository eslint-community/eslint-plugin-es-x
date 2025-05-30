"use strict"

const { defineGlobalsHandler } = require("../util/define-globals-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `AsyncDisposableStack` class.",
            category: "ES2026",
            proposal: "explicit-resource-management",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-asyncdisposablestack.html",
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
}
