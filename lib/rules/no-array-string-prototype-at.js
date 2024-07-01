/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const rules = [
    require("./no-array-prototype-at"),
    require("./no-string-prototype-at"),
]
module.exports = {
    meta: {
        deprecated: true,
        docs: {
            description:
                "disallow the `{Array,String}.prototype.at()` methods.",
            category: "ES2022",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-array-string-prototype-at.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2022 '{{name}}' method is forbidden.",
        },
        replacedBy: ["no-array-prototype-at", "no-string-prototype-at"],
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
        const visitorEntries = rules.flatMap((rule) =>
            Object.entries(rule.create(context)),
        )
        return Object.fromEntries(
            [...new Set(visitorEntries.map(([key]) => key))].map((key) => {
                const visitors = visitorEntries.filter(([k]) => k === key)
                return [
                    key,
                    (...args) => {
                        for (const [, visitor] of visitors) {
                            visitor(...args)
                        }
                    },
                ]
            }),
        )
    },
}
