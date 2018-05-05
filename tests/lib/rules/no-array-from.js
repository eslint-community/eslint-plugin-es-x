/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-from.js")

new RuleTester().run("no-array-from", rule, {
    valid: ["Array", "Array.of", "let Array = 0; Array.from"],
    invalid: [
        {
            code: "Array.from",
            errors: ["ES2015 'Array.from' method is forbidden."],
        },
    ],
})
