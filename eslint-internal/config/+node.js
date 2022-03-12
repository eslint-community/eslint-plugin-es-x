/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    plugins: ["node"],
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
        "node/exports-style": ["error", "module.exports"],
        "node/file-extension-in-import": [
            "error",
            "always",
            { ".js": "never", ".ts": "never", ".tsx": "never" },
        ],
        "node/no-callback-literal": "off",
        "node/no-deprecated-api": "error",
        "node/no-exports-assign": "error",
        "node/no-extraneous-import": "error",
        "node/no-extraneous-require": "error",
        "node/no-missing-import": "error",
        "node/no-missing-require": "error",
        "node/no-unpublished-bin": "error",
        "node/no-unpublished-import": "error",
        "node/no-unpublished-require": "error",
        "node/no-unsupported-features/es-builtins": "error",
        "node/no-unsupported-features/es-syntax": "error",
        "node/no-unsupported-features/node-builtins": "error",
        "node/prefer-global/buffer": "error",
        "node/prefer-global/console": "error",
        "node/prefer-global/process": "error",
        "node/prefer-global/text-decoder": "off",
        "node/prefer-global/text-encoder": "off",
        "node/prefer-global/url-search-params": "off",
        "node/prefer-global/url": "off",
        "node/prefer-promises/dns": "off",
        "node/prefer-promises/fs": "off",
        "node/process-exit-as-throw": "error",
        "node/shebang": "error",
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
