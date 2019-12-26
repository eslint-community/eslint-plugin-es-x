/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-bigint.js")

if (!RuleTester.isSupported(2020)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-bigint.")
    return
}

new RuleTester().run("no-bigint", rule, {
    valid: ["100"],
    invalid: [
        {
            code: "100n",
            errors: ["ES2020 BigInt is forbidden."],
        },
        {
            code: "({ 100n: null })",
            errors: ["ES2020 BigInt is forbidden."],
        },
        {
            code: "({ 100n() {} })",
            errors: ["ES2020 BigInt is forbidden."],
        },
        {
            code: "({ get 100n() {} })",
            errors: ["ES2020 BigInt is forbidden."],
        },
        {
            code: "class A { 100n() {} }",
            errors: ["ES2020 BigInt is forbidden."],
        },
        {
            code: "class A { get 100n() {} }",
            errors: ["ES2020 BigInt is forbidden."],
        },
        {
            code: "BigInt",
            errors: ["ES2020 BigInt is forbidden."],
        },
        {
            code: "BigInt64Array",
            errors: ["ES2020 BigInt is forbidden."],
        },
        {
            code: "BigUint64Array",
            errors: ["ES2020 BigInt is forbidden."],
        },
    ],
})
