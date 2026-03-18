/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-math-cosh.js")

new RuleTester().run("no-math-cosh", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.cosh"],
    invalid: [
        {
            code: "Math.cosh",
            errors: ["ES2015 'Math.cosh' method is forbidden."],
        },
    ],
})
