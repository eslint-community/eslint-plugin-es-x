/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const {
    defineStaticPropertiesHandler,
} = require("../util/define-static-properties-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `Math.tanh` method.",
            category: "ES2015",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-math-tanh.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2015 '{{name}}' method is forbidden.",
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
            Math: { tanh: "function" },
        })
    },
}
