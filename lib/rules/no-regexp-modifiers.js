"use strict"

const { defineRegExpHandler } = require("../util/define-regexp-handler")

module.exports = {
    meta: {
        docs: {
            description: "disallow RegExp Modifiers.",
            category: "ES2025",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-regexp-modifiers.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2025 RegExp Modifiers are forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return defineRegExpHandler(context, (node) => {
            const found = []
            return {
                onPatternEnter() {
                    found.length = 0
                },
                onModifiersLeave(start, end) {
                    found.push({ start, end })
                },
                onExit() {
                    for (const { start, end } of found) {
                        const sourceCode = context.sourceCode
                        context.report({
                            node,
                            loc:
                                node.type === "Literal"
                                    ? {
                                          start: sourceCode.getLocFromIndex(
                                              node.range[0] +
                                                  1 /* slash */ +
                                                  start,
                                          ),
                                          end: sourceCode.getLocFromIndex(
                                              node.range[0] +
                                                  1 /* slash */ +
                                                  end,
                                          ),
                                      }
                                    : null,
                            messageId: "forbidden",
                        })
                    }
                },
            }
        })
    },
}
