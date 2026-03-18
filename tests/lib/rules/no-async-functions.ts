/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-async-functions.js")

new RuleTester().run("no-async-functions", rule, {
    valid: [
        "function f() {}",
        "const f = function() {}",
        "const f = () => {}",
        "({ method() {} })",
        "class A { method() {} }",
        "(class { method() {} })",
    ],
    invalid: [
        {
            code: "async function f() {}",
            errors: ["ES2017 async function declarations are forbidden."],
        },
        {
            code: "const f = async function() {}",
            errors: ["ES2017 async function declarations are forbidden."],
        },
        {
            code: "const f = async () => {}",
            errors: ["ES2017 async function declarations are forbidden."],
        },
        {
            code: "({ async method() {} })",
            errors: ["ES2017 async function declarations are forbidden."],
        },
        {
            code: "class A { async method() {} }",
            errors: ["ES2017 async function declarations are forbidden."],
        },
        {
            code: "(class { async method() {} })",
            errors: ["ES2017 async function declarations are forbidden."],
        },
    ],
})
