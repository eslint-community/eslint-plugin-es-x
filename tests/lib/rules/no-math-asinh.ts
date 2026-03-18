/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-math-asinh.js")

new RuleTester().run("no-math-asinh", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.asinh"],
    invalid: [
        {
            code: "Math.asinh",
            errors: ["ES2015 'Math.asinh' method is forbidden."],
        },
    ],
})
