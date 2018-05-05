/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-of.js")

new RuleTester().run("no-array-of", rule, {
    valid: ["Array", "Array.from", "let Array = 0; Array.of"],
    invalid: [
        {
            code: "Array.of",
            errors: ["ES2015 'Array.of' method is forbidden."],
        },
    ],
})
