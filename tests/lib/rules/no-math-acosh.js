/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-math-acosh.js")

new RuleTester().run("no-math-acosh", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.acosh"],
    invalid: [
        {
            code: "Math.acosh",
            errors: ["ES2015 'Math.acosh' method is forbidden."],
        },
    ],
})
