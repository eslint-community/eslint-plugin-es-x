"use strict"

const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `Date.prototype.toGMTString` method.",
            category: "legacy",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-date-prototype-togmtstring.html",
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
                    allowTestedProperty: { type: "boolean" },
                },
                additionalProperties: false,
            },
        ],
        type: "problem",
        hasSuggestions: true,
    },
    create(context) {
        return definePrototypePropertiesHandler(
            context,
            {
                Date: { toGMTString: "function" },
            },
            {
                createReport({ objectTypeResult, node }) {
                    if (node.computed) {
                        return null
                    }
                    if (objectTypeResult !== true) {
                        return {
                            suggest: [
                                {
                                    desc: "Replace with 'toUTCString'",
                                    fix,
                                },
                            ],
                        }
                    }
                    return {
                        fix,
                    }

                    function fix(fixer) {
                        return fixer.replaceText(node.property, "toUTCString")
                    }
                },
            },
        )
    },
}
