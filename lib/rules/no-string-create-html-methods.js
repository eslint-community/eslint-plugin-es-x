"use strict"

const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow HTML creation methods of string instances.",
            category: "legacy",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-string-create-html-methods.html",
        },
        fixable: null,
        messages: {
            forbidden: "Annex B feature '{{name}}' method is forbidden.",
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
            String: {
                anchor: "function",
                big: "function",
                blink: "function",
                bold: "function",
                fixed: "function",
                fontcolor: "function",
                fontsize: "function",
                italics: "function",
                link: "function",
                small: "function",
                strike: "function",
                sub: "function",
                sup: "function",
            },
        })
    },
}
