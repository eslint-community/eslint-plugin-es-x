/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

const globals = require("./_browser-globals")

module.exports = [
    {
        name: "eslint-internal/config/+browser.js",
        languageOptions: {
            globals,
        },
    },
]
