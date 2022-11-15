/**
 * @fileoverview Rule to disallow a use of ignored variables.
 * @author Toru Nagashima
 */
"use strict"

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const DEFAULT_IGNORE_PATTERN = /^_[a-zA-Z]+$/u

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Disallow a use of ignored variables.",
            category: "Stylistic Issues",
            recommended: false,
            url: "https://github.com/eslint-community/eslint-plugin-es-x/blob/master/docs/rules/my-no-use-ignored-vars.md",
        },
        fixable: null,
        schema: [{ type: "string" }],
        type: "suggestion",
    },

    create(context) {
        const ignorePattern =
            context.options[0] != null
                ? new RegExp(context.options[0], "u")
                : DEFAULT_IGNORE_PATTERN

        /**
         * Checks whether a given variable is ignored or not.
         *
         * @param {escope.Variable} variable - A variable to check.
         * @returns {boolean} `true` if the variable is ignored.
         */
        function isIgnored(variable) {
            return ignorePattern.test(variable.name)
        }

        /**
         * Checks whether a given reference is an initializer or not.
         *
         * @param {escope.Reference} reference - A reference to check.
         * @returns {boolean} `true` if the reference ia an initializer.
         */
        function isNotInitializer(reference) {
            return !reference.init
        }

        /**
         * Reports a reference.
         *
         * @param {escope.Reference} reference - A reference to report.
         * @returns {void}
         */
        function report(reference) {
            const id = reference.identifier

            context.report({
                node: id,
                message:
                    "Unexpected a use of '{{name}}'. This name is matched to ignored pattern.",
                data: id,
            })
        }

        /**
         * Reports references of a given variable.
         *
         * @param {escope.Variable} variable - A variable to report.
         * @returns {void}
         */
        function reportReferences(variable) {
            variable.references.filter(isNotInitializer).forEach(report)
        }

        return {
            "Program:exit"() {
                const queue = [context.getScope()]
                let scope = null

                while ((scope = queue.pop()) != null) {
                    scope.variables.filter(isIgnored).forEach(reportReferences)

                    Array.prototype.push.apply(queue, scope.childScopes)
                }
            },
        }
    },
}
