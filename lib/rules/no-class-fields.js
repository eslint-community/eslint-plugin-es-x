/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const rules = [
    require("./no-class-instance-fields"),
    require("./no-class-private-fields"),
    require("./no-class-private-methods"),
    require("./no-class-static-fields"),
]
module.exports = {
    meta: {
        deprecated: true,
        docs: {
            description: "disallow class fields.",
            category: "ES2022",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-class-fields.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2022 {{nameWithKind}} is forbidden.",
        },
        replacedBy: [
            "no-class-instance-fields",
            "no-class-private-fields",
            "no-class-private-methods",
            "no-class-static-fields",
        ],
        schema: [],
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
