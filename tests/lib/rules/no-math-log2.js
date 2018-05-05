/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-math-log2.js")

new RuleTester().run("no-math-log2", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.log2"],
    invalid: [
        {
            code: "Math.log2",
            errors: ["ES2015 'Math.log2' method is forbidden."],
        },
    ],
})
