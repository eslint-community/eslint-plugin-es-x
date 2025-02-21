/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `Array.prototype.includes` method.",
            category: "ES2016",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-array-prototype-includes.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2016 '{{name}}' method is forbidden.",
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
            Array: { includes: "function" },
            Int8Array: { includes: "function" },
            Uint8Array: { includes: "function" },
            Uint8ClampedArray: { includes: "function" },
            Int16Array: { includes: "function" },
            Uint16Array: { includes: "function" },
            Int32Array: { includes: "function" },
            Uint32Array: { includes: "function" },
            Float32Array: { includes: "function" },
            Float64Array: { includes: "function" },
            BigInt64Array: { includes: "function" },
            BigUint64Array: { includes: "function" },
        })
    },
}
