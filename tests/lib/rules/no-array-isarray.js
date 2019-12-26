/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-isarray.js")

new RuleTester().run("no-array-isarray", rule, {
    valid: ["Array", "Array.from", "let Array = 0; Array.isArray"],
    invalid: [
        {
            code: "Array.isArray",
            errors: ["ES5 'Array.isArray' method is forbidden."],
        },
    ],
})
