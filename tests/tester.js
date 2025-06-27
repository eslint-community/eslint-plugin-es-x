/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { Linter } = require("eslint")
const { RuleTester } = require("eslint")
const { builtin } = require("globals")
const semver = require("semver")

const eslintVersion = new Linter().version
const ecmaVersion =
    /*eslint-disable prettier/prettier */
    semver.gte(eslintVersion, "9.29.0") ? 2026 :
    2025
    /*eslint-enable prettier/prettier */

//eslint-disable-next-line no-console
console.log("ECMAScript Version: %d", ecmaVersion)

RuleTester.setDefaultConfig({
    languageOptions: {
        ecmaVersion,
        sourceType: "script",
        globals: {
            AsyncDisposableStack: "readonly",
            DisposableStack: "readonly",
            SuppressedError: "readonly",
            ...builtin,
        },
    },
})
RuleTester.isSupported = (targetEcmaVersion) => targetEcmaVersion <= ecmaVersion
RuleTester.eslintVersion = eslintVersion
RuleTester.supportedEcmaVersion = ecmaVersion

module.exports = RuleTester
