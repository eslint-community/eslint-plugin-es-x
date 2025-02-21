"use strict"

const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")
module.exports = {
    meta: {
        docs: {
            description:
                "disallow the `DataView.prototype.{getFloat16,setFloat16}` methods.",
            category: "ES2025",
            recommended: false,
            proposal: "float16array",
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-dataview-prototype-getfloat16-setfloat16.html",
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
                    allowTestedProperty: { type: "boolean" },
                },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        return definePrototypePropertiesHandler(context, {
            DataView: { getFloat16: "function", setFloat16: "function" },
        })
    },
}
