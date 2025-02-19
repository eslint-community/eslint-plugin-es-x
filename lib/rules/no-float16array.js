"use strict"

const { defineGlobalsHandler } = require("../util/define-globals-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `Float16Array` class.",
            category: "ES2025",
            recommended: false,
            proposal: "float16array",
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-float16array.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2025 '{{name}}' class is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineGlobalsHandler(context, ["Float16Array"])
    },
}
