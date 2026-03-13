/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { createRule } = require("../util/create-rule")
const { defineGlobalsHandler } = require("../util/define-globals-handler")

module.exports = createRule({
    meta: {
        docs: {
            description: "disallow the `Atomics` class.",
            category: "ES2017",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-atomics.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2017 '{{name}}' class is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineGlobalsHandler(context, ["Atomics"])
    },
})
