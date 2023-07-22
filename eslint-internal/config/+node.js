/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    plugins: ["n"],
    parserOptions: {
        ecmaFeatures: { globalReturn: true },
        ecmaVersion: 2020,
        sourceType: "script",
    },
    globals: {
        // ECMAScript (experimental)
        globalThis: "readonly",
        // ECMA-404
        Intl: "readonly",

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

        // Node.js
        Buffer: "readonly",
        GLOBAL: "readonly",
        clearImmediate: "readonly",
        global: "readonly",
        process: "readonly",
        root: "readonly",
        setImmediate: "readonly",

        // CommonJS
        __dirname: "readonly",
        __filename: "readonly",
        exports: "writable",
        module: "readonly",
        require: "readonly",
    },
    rules: {
        "n/exports-style": ["error", "module.exports"],
        "n/file-extension-in-import": [
            "error",
            "always",
            { ".js": "never", ".ts": "never", ".tsx": "never" },
        ],
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
    overrides: [
        {
            files: ["*.mjs", "*.ts", "*.tsx", "*.vue"],
            extends: [require.resolve("./+modules.js")],
        },
    ],
}
