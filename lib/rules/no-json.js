/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { defineGlobalsHandler } = require("../util/define-globals-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `JSON` class.",
            category: "ES5",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-json.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES5 '{{name}}' class is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineGlobalsHandler(context, ["JSON"])
    },
}
