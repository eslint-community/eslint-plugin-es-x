/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-math-log10.js")

new RuleTester().run("no-math-log10", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.log10"],
    invalid: [
        {
            code: "Math.log10",
            errors: ["ES2015 'Math.log10' method is forbidden."],
        },
    ],
})
