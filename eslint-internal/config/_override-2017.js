/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = [
    {
        name: "eslint-internal/config/_override-2017.js",
        languageOptions: {
            ecmaVersion: 2017,
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
    },
]
