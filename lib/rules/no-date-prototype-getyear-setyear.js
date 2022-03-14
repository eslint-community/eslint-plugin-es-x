"use strict"

const {
    definePrototypeMethodHandler,
} = require("../util/define-prototype-method-handler")

module.exports = {
    meta: {
        docs: {
            description:
                "disallow the `Date.prototype.{getYear,setYear}` methods.",
            category: "legacy",
            recommended: false,
            url: "http://ota-meshi.github.io/eslint-plugin-es-x/rules/no-date-prototype-getyear-setyear.html",
        },
        fixable: "code",
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
        hasSuggestions: true,
    },
    create(context) {
        return definePrototypeMethodHandler(context, {
            Date: ["getYear", "setYear"],
        })
    },
}
