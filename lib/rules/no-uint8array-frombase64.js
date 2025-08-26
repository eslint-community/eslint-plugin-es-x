"use strict"

const {
    defineStaticPropertiesHandler,
} = require("../util/define-static-properties-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `Uint8Array.fromBase64` method.",
            category: "ES2026",
            recommended: false,
            proposal: "arraybuffer-base64",
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-uint8array-frombase64.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2026 '{{name}}' method is forbidden.",
        },
        schema: [
            {
                type: "object",
                properties: { allowTestedProperty: { type: "boolean" } },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        return defineStaticPropertiesHandler(context, {
            Uint8Array: { fromBase64: "function" },
        })
    },
}
