/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { createRule } = require("../util/create-rule")
const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = createRule({
    meta: {
        docs: {
            description: "disallow the `Array.prototype.map` method.",
            category: "ES5",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-array-prototype-map.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES5 '{{name}}' method is forbidden.",
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
            Array: { map: "function" },
        })
    },
})
