/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-math-imul.js")

new RuleTester().run("no-math-imul", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.imul"],
    invalid: [
        {
            code: "Math.imul",
            errors: ["ES2015 'Math.imul' method is forbidden."],
        },
    ],
})
