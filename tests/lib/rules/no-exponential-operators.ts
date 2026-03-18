/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-exponential-operators.js")

new RuleTester().run("no-exponential-operators", rule, {
    valid: ["a*b", "a*=b"],
    invalid: [
        {
            code: "a**b",
            errors: ["ES2016 exponential operators are forbidden."],
        },
        {
            code: "a**=b",
            errors: ["ES2016 exponential operators are forbidden."],
        },
    ],
})
