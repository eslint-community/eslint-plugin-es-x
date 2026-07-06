/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
import { createRule } from "../util/create-rule"
import { mergeVisitors } from "../util/merge-visitors"

import noClassInstanceFields from "./no-class-instance-fields"
import noClassPrivateFields from "./no-class-private-fields"
import noClassPrivateMethods from "./no-class-private-methods"
import noClassStaticFields from "./no-class-static-fields"

const rules = [
    noClassInstanceFields,
    noClassPrivateFields,
    noClassPrivateMethods,
    noClassStaticFields,
]

export default createRule<"forbidden", []>({
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
