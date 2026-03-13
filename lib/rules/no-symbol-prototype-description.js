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
            description:
                "disallow the `Symbol.prototype.description` property.",
            category: "ES2019",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-symbol-prototype-description.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2019 '{{name}}' property is forbidden.",
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
            Symbol: { description: ["string", "undefined"] },
        })
    },
})
