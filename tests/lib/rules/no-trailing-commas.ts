/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-trailing-commas.js")

new RuleTester().run("no-trailing-commas", rule, {
    valid: [
        "var a = []",
        "var a = [a]",
        "var a = [a,b]",
        "var a = {}",
        "var a = {a}",
        "var a = {a,b}",
        "function f(a,) {}",
        "f(a,)",
    ],
    invalid: [
        {
            code: "var a = [1,]",
            errors: [
                "ES5 trailing commas in array/object literals are forbidden.",
            ],
        },
        {
            code: "var obj = {a,}",
            errors: [
                "ES5 trailing commas in array/object literals are forbidden.",
            ],
        },
        {
            code: "var obj = {a:1,}",
            errors: [
                "ES5 trailing commas in array/object literals are forbidden.",
            ],
        },
    ],
})
