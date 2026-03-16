/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { RuleTester } = require("eslint")
const { builtin } = require("globals")

RuleTester.setDefaultConfig({
    languageOptions: {
        ecmaVersion: 2026,
        sourceType: "script",
        globals: {
            AsyncDisposableStack: "readonly",
            DisposableStack: "readonly",
            SuppressedError: "readonly",
            ...builtin,
        },
    },
})

module.exports = RuleTester
