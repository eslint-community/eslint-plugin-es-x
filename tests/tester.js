/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const { RuleTester } = require("eslint")
const { es2017 } = require("globals")

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: "script",
    },
    globals: es2017,
})

module.exports = RuleTester
