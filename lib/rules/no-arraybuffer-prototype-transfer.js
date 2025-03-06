"use strict"

const {
    definePrototypePropertiesHandler,
} = require("../util/define-prototype-properties-handler")

module.exports = {
    meta: {
        docs: {
            description:
                "disallow the `ArrayBuffer.prototype.transfer` method.",
            category: "ES2024",
            recommended: false,
            url: "http://eslint-community.github.io/eslint-plugin-es-x/rules/no-arraybuffer-prototype-transfer.html",
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
}
