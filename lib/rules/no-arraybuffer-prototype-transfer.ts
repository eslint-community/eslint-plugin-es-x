import { createRule } from "../util/create-rule"
import { definePrototypePropertiesHandler } from "../util/define-prototype-properties-handler/index"

type Options = [
    {
        aggressive?: boolean
        allowTestedProperty?: boolean
    }?,
]

export default createRule<"forbidden" | "forbiddenForDetached", Options>({
    meta: {
        docs: {
            description:
                "disallow the `ArrayBuffer.prototype.transfer` method.",
            category: "ES2024",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-es-x/rules/no-arraybuffer-prototype-transfer.html",
        },
        fixable: null,
        messages: {
            forbidden: "ES2024 '{{name}}' method is forbidden.",
            forbiddenForDetached:
                "ES2024 'ArrayBuffer.prototype.detached' property is forbidden.",
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
        return definePrototypePropertiesHandler(
            context,
            {
                ArrayBuffer: {
                    detached: "boolean",
                    transfer: "function",
                    transferToFixedLength: "function",
                },
            },
            {
                createReport({ propertyName }) {
                    return {
                        messageId:
                            propertyName === "detached"
                                ? "forbiddenForDetached"
                                : "forbidden",
                    }
                },
            },
        )
    },
})
