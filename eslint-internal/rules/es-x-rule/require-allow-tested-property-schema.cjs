"use strict"

const {
    ReferenceTracker,
    READ,
    ESM,
} = require("@eslint-community/eslint-utils")
const path = require("node:path")
const {
    defineSchemaChecker,
    getProperty,
} = require("../../utils/schema-checker.cjs")

/**
 * @typedef {import("estree").Node} Node
 * @typedef {import("estree").Property} Property
 * @typedef {import("eslint").Rule.RuleContext} RuleContext
 */

module.exports = {
    meta: {
        docs: {
            description: "require allowTestedProperty schema.",
            category: "Possible Errors",
            recommended: false,
            url: "https://github.com/eslint-community/eslint-plugin-es-x/blob/master/docs/rules/require-allow-tested-property-schema.md",
        },
        fixable: "code",
        schema: [],
        type: "suggestion",
    },
    /** @param {RuleContext} context */
    create(context) {
        const sourceCode = context.sourceCode

        const tracker = new ReferenceTracker(
            sourceCode.getScope(sourceCode.ast),
        )

        const traceMap = Object.fromEntries(
            Object.entries({
                "lib/util/define-static-properties-handler/index.ts": {
                    defineStaticPropertiesHandler: { [READ]: true },
                    [ESM]: true,
                },
                "lib/util/define-prototype-properties-handler/index.ts": {
                    definePrototypePropertiesHandler: { [READ]: true },
                    [ESM]: true,
                },
                "lib/util/define-nonstandard-prototype-properties-handler/index.ts":
                    {
                        defineNonstandardPrototypePropertiesHandler: {
                            [READ]: true,
                        },
                        [ESM]: true,
                    },
                "lib/util/define-nonstandard-static-properties-handler/index.ts":
                    {
                        defineNonstandardStaticPropertiesHandler: {
                            [READ]: true,
                        },
                        [ESM]: true,
                    },
            }).map(([filePath, properties]) => {
                const absolutePath = path.join(__dirname, "../../..", filePath)
                const relativePath = path.relative(
                    path.dirname(context.filename),
                    absolutePath,
                )
                return [relativePath, properties]
            }),
        )

        if (tracker.iterateEsmReferences(traceMap).next().done) {
            return {}
        }

        return defineSchemaChecker(context, (propertiesNode) => {
            const allowTestedProperty = getProperty(
                propertiesNode,
                "allowTestedProperty",
            )
            if (!allowTestedProperty) {
                context.report({
                    node: propertiesNode,
                    message:
                        "The schema must have the allowTestedProperty property.",
                    fix(fixer) {
                        return fixer.insertTextBefore(
                            sourceCode.getLastToken(propertiesNode),
                            'allowTestedProperty: { type: "boolean" }',
                        )
                    },
                })
            }
        })
    },
}
