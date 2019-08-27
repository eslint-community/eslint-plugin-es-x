/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { Linter, RuleTester } = require("eslint")
const { es2017 } = require("globals")
const semver = require("semver")

const eslintVersion = new Linter().version
const ecmaVersion = semver.lt(eslintVersion, "5.0.0") ? 2018 : 2019

//eslint-disable-next-line no-console
console.log("ECMAScript Version: %d", ecmaVersion)

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion,
        sourceType: "script",
    },
    globals: es2017,
})
RuleTester.isSupported = targetEcmaVersion => targetEcmaVersion <= ecmaVersion

module.exports = RuleTester
