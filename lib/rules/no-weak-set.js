/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { defineGlobalsHandler } = require("../util/define-globals-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `WeakSet` class.",
            category: "ES2015",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-weak-set.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2015 '{{name}}' class is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineGlobalsHandler(context, ["WeakSet"])
    },
}
