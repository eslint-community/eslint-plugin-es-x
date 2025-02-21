/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `Array.prototype.at()` methods.",
            category: "ES2022",
            proposal: "relative-indexing-method",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-array-prototype-at.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2022 '{{name}}' method is forbidden.",
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
            Array: { at: "function" },
            Int8Array: { at: "function" },
            Uint8Array: { at: "function" },
            Uint8ClampedArray: { at: "function" },
            Int16Array: { at: "function" },
            Uint16Array: { at: "function" },
            Int32Array: { at: "function" },
            Uint32Array: { at: "function" },
            Float32Array: { at: "function" },
            Float64Array: { at: "function" },
            BigInt64Array: { at: "function" },
            BigUint64Array: { at: "function" },
        })
    },
}
