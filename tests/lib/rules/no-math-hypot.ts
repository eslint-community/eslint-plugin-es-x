/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-math-hypot.js")

new RuleTester().run("no-math-hypot", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.hypot"],
    invalid: [
        {
            code: "Math.hypot",
            errors: ["ES2015 'Math.hypot' method is forbidden."],
        },
    ],
})
