"use strict"

const { defineConfig, globalIgnores } = require("eslint/config")
const tseslint = require("typescript-eslint")

module.exports = defineConfig([
    globalIgnores([
        ".nyc_output/",
        "coverage/",
        "!docs/.vitepress",
        "docs/.vitepress/dist/",
        "docs/.vitepress/cache/",
        "dist/",
        "tests/fixtures/",
    ]),
    {
        plugins: {
            my: require("./eslint-internal/my-plugin.js"),
        },
        languageOptions: {
            globals: {
                WeakRef: "readonly",
                FinalizationRegistry: "readonly",
                Iterator: "readonly",
                DisposableStack: "readonly",
                AsyncDisposableStack: "readonly",
            },
        },
    },
    require("./eslint-internal/config/es2020.js"),
    require("./eslint-internal/config/+eslint-plugin.js"),
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
        files: ["lib/rules/**/*.{js,ts}"],
        rules: {
            "eslint-plugin/require-meta-docs-url": [
                "error",
                {
                    pattern:
                        "https://eslint-community.github.io/eslint-plugin-es-x/rules/{{name}}.html",
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
        files: ["scripts/**/*.{js,ts}"],
        rules: {
            "n/no-unsupported-features/node-builtins": "off",
            "n/no-missing-import": [
                "error",
                {
                    allowModules: ["json-schema"],
                },
            ],
        },
    },
    {
        files: ["**/*.ts", "**/*.mts", "**/*.cts"],
        languageOptions: {
            parser: tseslint.parser,
        },
        extends: [tseslint.configs.recommended],
        rules: {
            // Don't ban `any` until strict mode is enabled.
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-return": "off",

            "n/file-extension-in-import": "off",
        },
    },
])
