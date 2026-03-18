/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-math-trunc.js")

new RuleTester().run("no-math-trunc", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.trunc"],
    invalid: [
        {
            code: "Math.trunc",
            errors: ["ES2015 'Math.trunc' method is forbidden."],
        },
    ],
})
