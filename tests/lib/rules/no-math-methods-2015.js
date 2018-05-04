/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-math-methods-2015.js")

new RuleTester().run("no-math-methods-2015", rule, {
    valid: ["Math", "Math.min(a,b)"],
    invalid: [
        {
            code: "Math.clz32",
            errors: ["ES2015 'Math.clz32' method is forbidden."],
        },
        {
            code: "Math.imul",
            errors: ["ES2015 'Math.imul' method is forbidden."],
        },
        {
            code: "Math.sign",
            errors: ["ES2015 'Math.sign' method is forbidden."],
        },
        {
            code: "Math.log10",
            errors: ["ES2015 'Math.log10' method is forbidden."],
        },
        {
            code: "Math.log2",
            errors: ["ES2015 'Math.log2' method is forbidden."],
        },
        {
            code: "Math.log1p",
            errors: ["ES2015 'Math.log1p' method is forbidden."],
        },
        {
            code: "Math.expm1",
            errors: ["ES2015 'Math.expm1' method is forbidden."],
        },
        {
            code: "Math.cosh",
            errors: ["ES2015 'Math.cosh' method is forbidden."],
        },
        {
            code: "Math.sinh",
            errors: ["ES2015 'Math.sinh' method is forbidden."],
        },
        {
            code: "Math.tanh",
            errors: ["ES2015 'Math.tanh' method is forbidden."],
        },
        {
            code: "Math.acosh",
            errors: ["ES2015 'Math.acosh' method is forbidden."],
        },
        {
            code: "Math.asinh",
            errors: ["ES2015 'Math.asinh' method is forbidden."],
        },
        {
            code: "Math.atanh",
            errors: ["ES2015 'Math.atanh' method is forbidden."],
        },
        {
            code: "Math.trunc",
            errors: ["ES2015 'Math.trunc' method is forbidden."],
        },
        {
            code: "Math.fround",
            errors: ["ES2015 'Math.fround' method is forbidden."],
        },
        {
            code: "Math.cbrt",
            errors: ["ES2015 'Math.cbrt' method is forbidden."],
        },
        {
            code: "Math.hypot",
            errors: ["ES2015 'Math.hypot' method is forbidden."],
        },
    ],
})
