/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { defineGlobalsHandler } = require("../util/define-globals-handler")

module.exports = {
    meta: {
        docs: {
            description:
                "disallow the `WeakRef` and `FinalizationRegistry` class.",
            category: "ES2021",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-weakrefs.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2021 '{{name}}' class is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineGlobalsHandler(context, [
            "WeakRef",
            "FinalizationRegistry",
        ])
    },
}
