"use strict"

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
    {
        ignores: [
            ".nyc_output/",
            "coverage/",
            "!docs/.vitepress",
            "docs/.vitepress/dist/",
            "docs/.vitepress/cache/",
            "node_modules/",
        ],
    },
    {
        plugins: {
            my: require("./eslint-internal/my-plugin.js"),
        },
    },
    ...require("./eslint-internal/config/es2020.js"),
    ...require("./eslint-internal/config/+eslint-plugin.js"),
    {
        rules: {
            "no-restricted-properties": [
                "error",
                {
                    object: "context",
                    property: "getSourceCode",
                    message: "Use context.sourceCode",
                },
                {
                    object: "context",
                    property: "getFilename",
                    message: "Use context.filename",
                },
                {
                    object: "context",
                    property: "getPhysicalFilename",
                    message: "Use context.physicalFilename",
                },
                {
                    object: "context",
                    property: "getCwd",
                    message: "Use context.cwd",
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
    },
    {
        files: ["lib/rules/**/*.js"],
        rules: {
            "eslint-plugin/require-meta-docs-url": [
                "error",
                {
                    pattern:
                        "http://eslint-community.github.io/eslint-plugin-es-x/rules/{{name}}.html",
                },
            ],

            "my/es-x-rule/require-allow-tested-property-schema": "error",
            "my/es-x-rule/require-aggressive-schema": "error",
            "my/es-x-rule/require-allow-schema": "error",
        },
    },
    {
        files: ["docs/.vitepress/**"],
        rules: {
            "n/no-missing-import": "off",
            "n/no-extraneous-import": "off",
            "n/file-extension-in-import": "off",
            "n/no-extraneous-require": "off",
        },
        languageOptions: {
            globals: {
                window: "readonly",
                document: "readonly",
            },
        },
    },
    {
        files: ["docs/.vitepress/**/*.vue"],
        rules: {
            "vue/multiline-html-element-content-newline": "off",
            "vue/singleline-html-element-content-newline": "off",
            "vue/component-definition-name-casing": "off",
            "vue/html-self-closing": "off",
            "vue/comma-dangle": "off",
        },
    },
    {
        files: ["scripts/**/*.js"],
        rules: {
            "n/no-unsupported-features/node-builtins": "off",
        },
    },
]

module.exports = config
