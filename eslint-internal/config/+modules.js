/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    plugins: ["node"],
    parserOptions: {
        ecmaFeatures: { globalReturn: false },
        sourceType: "module",
    },
    globals: {
        __dirname: "off",
        __filename: "off",
        exports: "off",
        module: "off",
        require: "off",
    },
    rules: {
        "node/no-extraneous-import": "error",
        "node/file-extension-in-import": [
            "error",
            "always",
            { ".js": "never", ".ts": "never", ".tsx": "never" },
        ],
        "node/no-missing-import": "error",
        "node/no-unpublished-import": "error",
        "node/no-unsupported-features/es-syntax": [
            "error",
            { ignores: ["modules", "dynamicImport"] },
        ],
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx", "*.vue"],
            rules: {
                "node/no-unsupported-features/es-syntax": "off",
            },
        },
    ],
}
