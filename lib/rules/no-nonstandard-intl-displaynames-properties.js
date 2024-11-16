"use strict"

const {
    READ,
    ReferenceTracker,
    getPropertyName,
} = require("@eslint-community/eslint-utils")
const { getSourceCode } = require("eslint-compat-utils")
const { intlDisplayNamesProperties } = require("../util/well-known-properties")

module.exports = {
    meta: {
        docs: {
            description:
                "disallow non-standard properties on `Intl.DisplayNames` class",
            category: "nonstandard",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-nonstandard-intl-displaynames-properties.html",
        },
        fixable: null,
        messages: {
            forbidden: "Non-standard '{{name}}' property is forbidden.",
        },
        schema: [
            {
                type: "object",
                properties: {
                    allow: {
                        type: "array",
                        items: { type: "string" },
                        uniqueItems: true,
                    },
                },
                additionalProperties: false,
            },
        ],
        type: "problem",
    },
    create(context) {
        /** @type {Set<string>} */
        const allows = new Set([
            ...(context.options[0]?.allow || []),
            ...intlDisplayNamesProperties,
        ])
        return {
            "Program:exit"(program) {
                const sourceCode = getSourceCode(context)
                const tracker = new ReferenceTracker(
                    sourceCode.getScope(program),
                )
                for (const { node, path } of tracker.iterateGlobalReferences({
                    Intl: { DisplayNames: { [READ]: true } },
                })) {
                    if (
                        node.parent.type !== "MemberExpression" ||
                        node.parent.object !== node
                    ) {
                        continue
                    }
                    const propertyName = getPropertyName(
                        node.parent,
                        sourceCode.getScope(node),
                    )
                    if (propertyName == null || allows.has(propertyName)) {
                        continue
                    }

                    context.report({
                        node,
                        messageId: "forbidden",
                        data: { name: [...path, propertyName].join(".") },
                    })
                }
            },
        }
    },
}
