/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { rulesDocumentUrl } = require("../utils")

module.exports = {
    plugins: ["eslint-plugin"],
    extends: [require.resolve("./+node.js")],
    overrides: [
        {
            files: ["**/rules/**", "**/internal-rules/**"],
            rules: {
                // Enabled rules
                "eslint-plugin/consistent-output": "error",
                "eslint-plugin/fixer-return": "error",
                "eslint-plugin/meta-property-ordering": [
                    "error",
                    [
                        "deprecated",
                        "docs",
                        "fixable",
                        "messages",
                        "replacedBy",
                        "schema",
                        "type",
                    ],
                ],
                "eslint-plugin/no-deprecated-context-methods": "error",
                "eslint-plugin/no-deprecated-report-api": "error",
                "eslint-plugin/no-identical-tests": "error",
                "eslint-plugin/no-missing-placeholders": "error",
                "eslint-plugin/no-unused-placeholders": "error",
                "eslint-plugin/no-useless-token-range": "error",
                "eslint-plugin/prefer-output-null": "error",
                "eslint-plugin/prefer-placeholders": "error",
                "eslint-plugin/prefer-replace-text": "error",
                "eslint-plugin/report-message-format": [
                    "error",
                    "[^a-z'\"{].*\\.$",
                ],
                "eslint-plugin/require-meta-docs-url": [
                    "error",
                    { pattern: rulesDocumentUrl },
                ],
                "eslint-plugin/require-meta-fixable": "error",
                "eslint-plugin/require-meta-type": "error",
                "eslint-plugin/test-case-property-ordering": [
                    "error",
                    [
                        "filename",
                        "code",
                        "output",
                        "options",
                        "parser",
                        "parserOptions",
                        "globals",
                        "env",
                        "errors",
                    ],
                ],
                "eslint-plugin/test-case-shorthand-strings": "error",
            },
        },
    ],
}
