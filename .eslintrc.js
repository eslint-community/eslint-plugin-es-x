"use strict"

module.exports = {
    extends: [
        "./eslint-internal/config/es2020.js",
        "./eslint-internal/config/+eslint-plugin.js",
    ],
    ignorePatterns: [
        "/.nyc_output",
        "/coverage",
        "/node_modules",
        "*.ts",
        "!.vuepress",
        "/docs/.vuepress/dist",
    ],
    globals: { fetch: "readonly" },
    rules: {
        "no-restricted-properties": [
            "error",
            {
                object: "context",
                property: "getSourceCode",
                message: "Use eslint-compat-utils",
            },
            {
                object: "context",
                property: "getFilename",
                message: "Use eslint-compat-utils",
            },
            {
                object: "context",
                property: "getPhysicalFilename",
                message: "Use eslint-compat-utils",
            },
            {
                object: "context",
                property: "getCwd",
                message: "Use eslint-compat-utils",
            },
            {
                object: "context",
                property: "getScope",
                message: "Use sourceCode.getScope(node)",
            },
            {
                object: "context",
                property: "parserServices",
                message: "Use sourceCode.parserServices",
            },
            {
                object: "context",
                property: "getDeclaredVariables",
                message: "Use sourceCode.getDeclaredVariables(node)",
            },
        ],
    },
    overrides: [
        {
            files: "lib/rules/**/*.js",
            rules: {
                "eslint-plugin/require-meta-docs-url": [
                    "error",
                    {
                        pattern:
                            "http://eslint-community.github.io/eslint-plugin-es-x/rules/{{name}}.html",
                    },
                ],
            },
        },
    ],
}
