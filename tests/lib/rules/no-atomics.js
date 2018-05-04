/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-atomics.js")

new RuleTester().run("no-atomics", rule, {
    valid: ["Array", "Object", "let Atomics = 0; Atomics"],
    invalid: [
        {
            code: "Atomics",
            errors: ["ES2017 'Atomics' class is forbidden."],
        },
        {
            code: "function f() { Atomics }",
            errors: ["ES2017 'Atomics' class is forbidden."],
        },
    ],
})
