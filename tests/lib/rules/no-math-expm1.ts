/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-math-expm1.js")

new RuleTester().run("no-math-expm1", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.expm1"],
    invalid: [
        {
            code: "Math.expm1",
            errors: ["ES2015 'Math.expm1' method is forbidden."],
        },
    ],
})
