"use strict"

const { createRule } = require("../util/create-rule")
const { defineGlobalsHandler } = require("../util/define-globals-handler")

module.exports = createRule({
    meta: {
        docs: {
            description: "disallow the `DisposableStack` class.",
            category: "ES2027",
            proposal: "explicit-resource-management",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-disposablestack.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2027 '{{name}}' class is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineGlobalsHandler(context, ["DisposableStack"])
    },
})
