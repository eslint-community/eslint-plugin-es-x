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
            description: "disallow the `Object.values` method.",
            category: "ES2017",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-object-values.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2017 '{{name}}' method is forbidden.",
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
            Object: { values: "function" },
        })
    },
}
