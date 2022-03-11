/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { Linter, RuleTester } = require("eslint")
const { builtin } = require("globals")
const semver = require("semver")

const eslintVersion = new Linter().version
const ecmaVersion =
    /*eslint-disable @mysticatea/prettier */
    semver.gte(eslintVersion, "8.0.0") ? 2022 :
    semver.gte(eslintVersion, "7.8.0") ? 2021 :
    semver.gte(eslintVersion, "6.2.0") ? 2020 :
    semver.gte(eslintVersion, "5.0.0") ? 2019 :
    2018
    /*eslint-enable @mysticatea/prettier */

//eslint-disable-next-line no-console
console.log("ECMAScript Version: %d", ecmaVersion)

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion,
        sourceType: "script",
    },
    globals: {
        AggregateError: "readonly",
        FinalizationRegistry: "readonly",
        WeakRef: "readonly",
        ...builtin,
    },
})
RuleTester.isSupported = targetEcmaVersion => targetEcmaVersion <= ecmaVersion

module.exports = RuleTester
