/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-math-tanh.js")

new RuleTester().run("no-math-tanh", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.tanh"],
    invalid: [
        {
            code: "Math.tanh",
            errors: ["ES2015 'Math.tanh' method is forbidden."],
        },
    ],
})
