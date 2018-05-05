/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-math-atanh.js")

new RuleTester().run("no-math-atanh", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.atanh"],
    invalid: [
        {
            code: "Math.atanh",
            errors: ["ES2015 'Math.atanh' method is forbidden."],
        },
    ],
})
