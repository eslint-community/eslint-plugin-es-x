/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    plugins: ["n"],
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
        "n/no-extraneous-import": "error",
        "n/file-extension-in-import": [
            "error",
            "always",
            { ".js": "never", ".ts": "never", ".tsx": "never" },
        ],
        "n/no-missing-import": "error",
        "n/no-unpublished-import": "error",
        "n/no-unsupported-features/es-syntax": [
            "error",
            { ignores: ["modules", "dynamicImport"] },
        ],
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx", "*.vue"],
            rules: {
                "n/no-unsupported-features/es-syntax": "off",
            },
        },
    ],
}
