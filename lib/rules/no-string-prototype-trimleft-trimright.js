"use strict"

const {
    definePrototypeMethodHandler,
} = require("../util/define-prototype-method-handler")

module.exports = {
    meta: {
        docs: {
            description:
                "disallow the `String.prototype.{trimLeft,trimRight}` methods.",
            category: "legacy",
            recommended: false,
            url: "http://ota-meshi.github.io/eslint-plugin-es-x/rules/no-string-prototype-trimleft-trimright.html",
        },
        fixable: null,
        messages: {
            forbidden: "Annex B feature '{{name}}' method is forbidden.",
        },
        schema: [
            {
                type: "object",
                properties: {
                    aggressive: { type: "boolean" },
                },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        return definePrototypeMethodHandler(context, {
            String: ["trimLeft", "trimRight"],
        })
    },
}
