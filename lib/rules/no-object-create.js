/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { ReferenceTracker, READ } = require("eslint-utils")

module.exports = {
    meta: {
        docs: {
            description: "disallow the `Object.create` method.",
            category: "ES5",
            recommended: false,
            url:
                "http://mysticatea.github.io/eslint-plugin-es/rules/no-object-create.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES5 '{{name}}' method is forbidden.",
        },
        schema: [],
        type: "problem",
    },
    create(context) {
        return {
            "Program:exit"() {
                const tracker = new ReferenceTracker(context.getScope())
                for (const { node, path } of tracker.iterateGlobalReferences({
                    Object: {
                        create: { [READ]: true },
                    },
                })) {
                    context.report({
                        node,
                        messageId: "forbidden",
                        data: { name: path.join(".") },
                    })
                }
            },
        }
    },
}
