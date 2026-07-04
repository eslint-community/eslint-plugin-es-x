/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { createRule } = require("../util/create-rule")
const { mergeVisitors } = require("../util/merge-visitors")

const rules = [
    require("./no-class-instance-fields"),
    require("./no-class-private-fields"),
    require("./no-class-private-methods"),
    require("./no-class-static-fields"),
]

module.exports = createRule({
    meta: {
        deprecated: true,
        docs: {
            description: "disallow class fields.",
            category: "ES2022",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-class-fields.html",
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
        return mergeVisitors(...rules.map((rule) => rule.create(context)))
    },
})
