"use strict"

const { version } = require("./package.json")

module.exports = {
    extends: ["plugin:mysticatea/es2015", "plugin:mysticatea/+eslint-plugin"],
    rules: {
        "mysticatea/eslint-plugin/require-meta-docs-url": [
            "error",
            {
                pattern: `https://github.com/mysticatea/eslint-plugin-es/blob/v${version}/docs/rules/{{name}}.md`,
            },
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
