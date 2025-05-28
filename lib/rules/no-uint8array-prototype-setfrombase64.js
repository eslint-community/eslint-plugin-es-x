"use strict"

const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = {
    meta: {
        docs: {
            description:
                "disallow the `Uint8Array.prototype.setFromBase64` method.",
            category: "ES2026",
            recommended: false,
            proposal: "arraybuffer-base64",
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-uint8array-prototype-setfrombase64.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2026 '{{name}}' method is forbidden.",
        },
        schema: [
            {
                type: "object",
                properties: {
                    allowTestedProperty: { type: "boolean" },
                    aggressive: { type: "boolean" },
                },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        return definePrototypePropertiesHandler(context, {
            Uint8Array: { setFromBase64: "function" },
        })
    },
}
