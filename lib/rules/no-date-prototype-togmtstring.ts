import { createRule } from "../util/create-rule.ts"
import { definePrototypePropertiesHandler } from "../util/define-prototype-properties-handler/index.ts"

type Options = [
    {
        aggressive?: boolean
        allowTestedProperty?: boolean
    }?,
]

export default createRule<"forbidden", Options>({
    meta: {
        docs: {
            description: "disallow the `Date.prototype.toGMTString` method.",
            category: "legacy",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-date-prototype-togmtstring.html",
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
                        if (node.type === "Property") {
                            return fixer.replaceText(node.key, '"toUTCString"')
                        }
                        return fixer.replaceText(node.property, "toUTCString")
                    }
                },
            },
        )
    },
})
