"use strict"

const { version } = require("./package.json")

module.exports = {
    extends: [
        "mysticatea",
        "mysticatea/node",
        "plugin:eslint-plugin/recommended",
        "plugin:prettier/recommended",
    ],
    plugins: ["eslint-plugin"],
    rules: {
        "eslint-plugin/consistent-output": "error",
        "eslint-plugin/no-deprecated-context-methods": "error",
        "eslint-plugin/prefer-output-null": "error",
        "eslint-plugin/prefer-placeholders": "error",
        "eslint-plugin/prefer-replace-text": "error",
        "eslint-plugin/report-message-format": ["error", "[^a-z].*\\.$"],
        "eslint-plugin/require-meta-docs-url": [
            "error",
            {
                pattern: `https://github.com/mysticatea/eslint-plugin-es/blob/v${version}/docs/rules/{{name}}.md`,
            },
        ],
        "eslint-plugin/test-case-property-ordering": "error",
        "eslint-plugin/test-case-shorthand-strings": "error",
        "mysticatea/arrow-parens": "off",
        "prettier/prettier": [
            "error",
            { tabWidth: 4, semi: false, trailingComma: "es5" },
        ],
    },

    overrides: [
        {
            files: ["scripts/*.js"],
            rules: {
                "require-jsdoc": "off",
            },
        },
    ],
}
