/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { definePatternMatcher } = require("../utils")
const hasCodePointEscape = definePatternMatcher(/\\u\{[0-9a-fA-F]+\}/g)

module.exports = {
    meta: {
        docs: {
            description: "disallow Unicode code point escape sequences.",
            category: "ES2015",
            recommended: false,
            url:
                "https://github.com/mysticatea/eslint-plugin-es/blob/v0.0.0/docs/rules/no-unicode-codepoint-escapes.md",
        },
        fixable: null,
        schema: [],
        messages: {
            forbidden:
                "ES2015 Unicode code point escape sequences are forbidden.",
        },
    },
    create(context) {
        const sourceCode = context.getSourceCode()
        const reported = new Set()

        return {
            Identifier(node) {
                if (hasCodePointEscape(sourceCode.getText(node))) {
                    context.report({ node, messageId: "forbidden" })
                }
            },
            Literal(node) {
                if (
                    typeof node.value === "string" &&
                    hasCodePointEscape(node.raw)
                ) {
                    context.report({ node, messageId: "forbidden" })
                }
            },
            TemplateElement(elementNode) {
                const node = elementNode.parent
                if (
                    !reported.has(node) &&
                    hasCodePointEscape(elementNode.value.raw)
                ) {
                    reported.add(node)
                    context.report({ node, messageId: "forbidden" })
                }
            },
        }
    },
}
