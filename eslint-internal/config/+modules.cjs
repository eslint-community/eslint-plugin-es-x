/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const n = require("eslint-plugin-n")

module.exports = [
    {
        name: "eslint-internal/config/+modules.cjs#1",
        plugins: { n: n.default ?? n },
        languageOptions: {
            sourceType: "module",
            globals: {
                __dirname: "off",
                __filename: "off",
                exports: "off",
                module: "off",
                require: "off",
            },
        },
        rules: {
            "n/no-extraneous-import": "error",
            "n/file-extension-in-import": ["error", "always"],
            "n/no-missing-import": "error",
            "n/no-unpublished-import": "error",
            "n/no-unsupported-features/es-syntax": [
                "error",
                { ignores: ["modules", "dynamicImport"] },
            ],
        },
    },
    {
        name: "eslint-internal/config/+modules.cjs#2",
        files: ["**/*.ts", "*.ts", "**/*.tsx", "*.tsx", "*.vue", "**/*.vue"],
        rules: {
            "n/no-unsupported-features/es-syntax": "off",
        },
    },
]
