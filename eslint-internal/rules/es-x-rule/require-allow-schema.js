"use strict"

const { ReferenceTracker, READ } = require("@eslint-community/eslint-utils")
const { getSourceCode, getFilename } = require("eslint-compat-utils")
const path = require("path")
const {
    defineSchemaChecker,
    getProperty,
} = require("../../utils/schema-checker")

/**
 * @typedef {import("estree").Node} Node
 * @typedef {import("estree").Property} Property
 * @typedef {import("eslint").Rule.RuleContext} RuleContext
 */

module.exports = {
    meta: {
        docs: {
            description: "require aggressive schema.",
            category: "Possible Errors",
            recommended: false,
            url: "https://github.com/eslint-community/eslint-plugin-es-x/blob/master/docs/rules/require-allow-schema.md",
        },
        fixable: "code",
        schema: [],
        type: "suggestion",
    },
    /** @param {RuleContext} context */
    create(context) {
        const sourceCode = getSourceCode(context)

        const tracker = new ReferenceTracker(
            sourceCode.getScope(sourceCode.ast),
        )

        const traceMap = Object.fromEntries(
            Object.entries({
                "lib/util/define-nonstandard-prototype-properties-handler": {
                    defineNonstandardPrototypePropertiesHandler: {
                        [READ]: true,
                    },
                },
                "lib/util/define-nonstandard-static-properties-handler": {
                    defineNonstandardStaticPropertiesHandler: { [READ]: true },
                },
            }).map(([filePath, properties]) => {
                const absolutePath = path.join(__dirname, "../../..", filePath)
                const relativePath = path.relative(
                    path.dirname(getFilename(context)),
                    absolutePath,
                )
                return [relativePath, properties]
            }),
        )

        if (tracker.iterateCjsReferences(traceMap).next().done) {
            return {}
        }

        return defineSchemaChecker(context, (propertiesNode) => {
            const aggressiveProperty = getProperty(propertiesNode, "allow")
            if (!aggressiveProperty) {
                context.report({
                    node: propertiesNode,
                    message: "The schema must have the aggressive property.",
                    fix(fixer) {
                        return fixer.insertTextBefore(
                            sourceCode.getLastToken(propertiesNode),
                            'allow: { type: "array", items: { type: "string" }, uniqueItems: true, }',
                        )
                    },
                })
            }
        })
    },
}
