/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = [
    {
        name: "eslint-internal/config/+node.js#1",
        files: ["**/*.js", "*.js", "**/*.cjs", "*.cjs"],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: { globalReturn: true },
            },
            globals: {
                // CommonJS
                __dirname: "readonly",
                __filename: "readonly",
                exports: "writable",
                module: "readonly",
                require: "readonly",
            },
        },
    },
    {
        name: "eslint-internal/config/+node.js#2",
        plugins: { n: require("eslint-plugin-n") },
        languageOptions: {
            ecmaVersion: 2020,
            globals: {
                // Web Standard
                TextDecoder: "readonly",
                TextEncoder: "readonly",
                URL: "readonly",
                URLSearchParams: "readonly",
                WebAssembly: "readonly",
                clearInterval: "readonly",
                clearTimeout: "readonly",
                console: "readonly",
                queueMicrotask: "readonly",
                setInterval: "readonly",
                setTimeout: "readonly",
                fetch: "readonly",

                // Node.js
                Buffer: "readonly",
                GLOBAL: "readonly",
                clearImmediate: "readonly",
                global: "readonly",
                process: "readonly",
                root: "readonly",
                setImmediate: "readonly",
            },
        },
        rules: {
            "n/exports-style": ["error", "module.exports"],
            "n/file-extension-in-import": ["error", "always"],
            "n/no-callback-literal": "off",
            "n/no-deprecated-api": "error",
            "n/no-exports-assign": "error",
            "n/no-extraneous-import": "error",
            "n/no-extraneous-require": "error",
            "n/no-missing-import": "error",
            "n/no-missing-require": "error",
            "n/no-unpublished-bin": "error",
            "n/no-unpublished-import": "error",
            "n/no-unpublished-require": "error",
            "n/no-unsupported-features/es-builtins": "error",
            "n/no-unsupported-features/es-syntax": "error",
            "n/no-unsupported-features/node-builtins": "error",
            "n/prefer-global/buffer": "error",
            "n/prefer-global/console": "error",
            "n/prefer-global/process": "error",
            "n/prefer-global/text-decoder": "off",
            "n/prefer-global/text-encoder": "off",
            "n/prefer-global/url-search-params": "off",
            "n/prefer-global/url": "off",
            "n/prefer-promises/dns": "off",
            "n/prefer-promises/fs": "off",
            "n/process-exit-as-throw": "error",
            "n/shebang": "error",
        },
        settings: {
            node: {
                tryExtensions: [
                    ".vue",
                    ".tsx",
                    ".ts",
                    ".mjs",
                    ".cjs",
                    ".js",
                    ".json",
                    ".node",
                ],
            },
        },
    },
]
