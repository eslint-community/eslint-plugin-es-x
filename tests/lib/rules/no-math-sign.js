/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-math-sign.js")

new RuleTester().run("no-math-sign", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.sign"],
    invalid: [
        {
            code: "Math.sign",
            errors: ["ES2015 'Math.sign' method is forbidden."],
        },
    ],
})
