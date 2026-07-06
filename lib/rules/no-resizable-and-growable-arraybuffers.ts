import { createRule } from "../util/create-rule"

type Options = [
    {
        aggressive?: boolean
        allowTestedProperty?: boolean
    }?,
]

import { mergeVisitors } from "../util/merge-visitors"
import { CONSTRUCT, ReferenceTracker } from "@eslint-community/eslint-utils"
import { definePrototypePropertiesHandler } from "../util/define-prototype-properties-handler/index"

/**
 * @param {Node|undefined} node
 * @returns {boolean}
 */
function isSpreadElement(node) {
    return node && node.type === "SpreadElement"
}

export default createRule<
    | "forbiddenForResizableArrayBuffer"
    | "forbiddenForGrowableSharedArrayBuffer",
    Options
>({
    meta: {
        docs: {
            description: "disallow resizable and growable ArrayBuffers",
            category: "ES2024",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-resizable-and-growable-arraybuffers.html",
        },
        fixable: null,
        messages: {
            forbiddenForResizableArrayBuffer:
                "ES2024 Resizable ArrayBuffer is forbidden.",
            forbiddenForGrowableSharedArrayBuffer:
                "ES2024 Growable SharedArrayBuffer is forbidden.",
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
    },
    create(context) {
        return mergeVisitors(
            definePrototypePropertiesHandler(
                context,
                {
                    ArrayBuffer: {
                        maxByteLength: "number",
                        resizable: "boolean",
                        resize: "function",
                    },
                    SharedArrayBuffer: {
                        grow: "function",
                        growable: "boolean",
                        maxByteLength: "number",
                    },
                },
                {
                    createReport({ className }) {
                        return {
                            messageId:
                                className === "ArrayBuffer"
                                    ? "forbiddenForResizableArrayBuffer"
                                    : "forbiddenForGrowableSharedArrayBuffer",
                        }
                    },
                },
            ),
            {
                "Program:exit"(program) {
                    const sourceCode = context.sourceCode
                    const tracker = new ReferenceTracker(
                        sourceCode.getScope(program),
                    )
                    for (const {
                        node,
                        path,
                    } of tracker.iterateGlobalReferences({
                        ArrayBuffer: { [CONSTRUCT]: true },
                        SharedArrayBuffer: { [CONSTRUCT]: true },
                    })) {
                        if (node.type !== "NewExpression") {
                            continue
                        }
                        const args = node.arguments.slice(0, 2)
                        if (args.some(isSpreadElement)) {
                            continue
                        }
                        const reportedNode = args[1]
                        if (reportedNode) {
                            context.report({
                                node: reportedNode,
                                messageId:
                                    path[0] === "ArrayBuffer"
                                        ? "forbiddenForResizableArrayBuffer"
                                        : "forbiddenForGrowableSharedArrayBuffer",
                            })
                        }
                    }
                },
            },
        )
    },
})
