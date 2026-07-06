import type { ESLint } from "eslint"
import { type Config, defineConfig, globalIgnores } from "eslint/config"
import tseslint from "typescript-eslint"

import myPlugin from "./eslint-internal/my-plugin.cjs"
import eslintPluginConfig from "./eslint-internal/config/+eslint-plugin.cjs"
import es2020 from "./eslint-internal/config/es2020.cjs"
import noStringPrototypeSubstr from "./lib/rules/no-string-prototype-substr.ts"

export default defineConfig([
    globalIgnores([
        ".nyc_output/",
        "coverage/",
        "!docs/.vitepress",
        "docs/.vitepress/dist/",
        "docs/.vitepress/cache/",
        "docs/.vitepress/.cache/",
        "docs/.vitepress/.temp/",
        "dist/",
        "tests/fixtures/",
    ]),
    {
        plugins: {
            "es-x": {
                rules: {
                    "no-string-prototype-substr": noStringPrototypeSubstr,
                },
            },
            my: myPlugin as ESLint.Plugin,
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
    ...(es2020 as Config[]),
    ...(eslintPluginConfig as Config[]),
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
            "es-x/no-string-prototype-substr": "error",
        },
    },
    {
        files: ["**/*.ts", "**/*.mts", "**/*.cts"],
        languageOptions: {
            parser: tseslint.parser,
        },
        extends: [tseslint.configs.recommended],
        settings: {
            node: {
                typescriptExtensionMap: [],
            },
        },
        rules: {
            "@typescript-eslint/consistent-type-imports": [
                "error",
                {
                    prefer: "type-imports",
                    fixStyle: "inline-type-imports",
                },
            ],

            // Don't ban `any` until strict mode is enabled.
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-return": "off",

            "n/file-extension-in-import": ["error", "always"],
            "n/no-missing-import": ["error", { ignoreTypeImport: true }],
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
])
