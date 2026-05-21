"use strict"

const { createRule } = require("../util/create-rule")
const { defineGlobalsHandler } = require("../util/define-globals-handler")

module.exports = createRule({
    meta: {
        docs: {
            description: "disallow the `Temporal` global object.",
            category: "ES2027",
            proposal: "temporal",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-temporal.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2027 '{{name}}' global object is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineGlobalsHandler(context, ["Temporal"])
    },
})
