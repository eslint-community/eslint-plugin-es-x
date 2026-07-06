/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const globals = require("./_browser-globals.cjs")

module.exports = [
    {
        name: "eslint-internal/config/+browser.cjs",
        languageOptions: {
            globals,
        },
    },
]
