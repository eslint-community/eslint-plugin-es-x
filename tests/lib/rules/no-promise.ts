/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-promise.js")

new RuleTester().run("no-promise", rule, {
    valid: ["Array", "Object", "let Promise = 0; Promise"],
    invalid: [
        {
            code: "Promise",
            errors: ["ES2015 'Promise' class is forbidden."],
        },
        {
            code: "function f() { Promise }",
            errors: ["ES2015 'Promise' class is forbidden."],
        },
    ],
})
