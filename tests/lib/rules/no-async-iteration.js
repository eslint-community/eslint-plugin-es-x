/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-async-iteration.js")

new RuleTester().run("no-async-iteration", rule, {
    valid: [
        "async function f() {}",
        "const f = async function() {}",
        "const f = async () => {}",
        "({ async method() {} })",
        "class A { async method() {} }",
        "(class { async method() {} })",
        "for (const a of b);",
    ],
    invalid: [
        {
            code: "async function* f() {}",
            errors: ["ES2018 async iteration is forbidden."],
        },
        {
            code: "const f = async function*() {}",
            errors: ["ES2018 async iteration is forbidden."],
        },
        {
            code: "({ async* method() {} })",
            errors: ["ES2018 async iteration is forbidden."],
        },
        {
            code: "class A { async* method() {} }",
            errors: ["ES2018 async iteration is forbidden."],
        },
        {
            code: "(class { async* method() {} })",
            errors: ["ES2018 async iteration is forbidden."],
        },
        {
            code: "async function f() { for await (a of b); }",
            errors: ["ES2018 async iteration is forbidden."],
        },
        {
            code: "async function f() { for await (var a of b); }",
            errors: ["ES2018 async iteration is forbidden."],
        },
        {
            code: "async function f() { for await (let a of b); }",
            errors: ["ES2018 async iteration is forbidden."],
        },
        {
            code: "async function f() { for await (const a of b); }",
            errors: ["ES2018 async iteration is forbidden."],
        },
    ],
})
