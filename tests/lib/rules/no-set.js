/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-set.js")

new RuleTester().run("no-set", rule, {
    valid: ["Array", "Object", "let Set = 0; Set"],
    invalid: [
        {
            code: "Set",
            errors: ["ES2015 'Set' class is forbidden."],
        },
        {
            code: "function f() { Set }",
            errors: ["ES2015 'Set' class is forbidden."],
        },
    ],
})
