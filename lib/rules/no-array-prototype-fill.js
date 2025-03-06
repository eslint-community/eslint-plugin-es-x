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
            description: "disallow the `Array.prototype.fill` method.",
            category: "ES2015",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-array-prototype-fill.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2015 '{{name}}' method is forbidden.",
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
            Array: { fill: "function" },
        })
    },
}
