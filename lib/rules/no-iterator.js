"use strict"

const { defineGlobalsHandler } = require("../util/define-globals-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `Iterator` class.",
            category: "ES2025",
            proposal: "iterator-helpers",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-iterator.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2025 '{{name}}' class is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineGlobalsHandler(context, ["Iterator"])
    },
}
