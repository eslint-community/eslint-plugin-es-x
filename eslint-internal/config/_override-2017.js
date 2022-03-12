/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    parserOptions: {
        ecmaVersion: 2017,
    },
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    rules: {
        "prettier/prettier": [
            "error",
            {
                tabWidth: 4,
                semi: false,
                trailingComma: "all",
            },
            {
                usePrettierrc: false,
            },
        ],
    },
}
