/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-number-minsafeinteger.js")

new RuleTester().run("no-number-minsafeinteger", rule, {
    valid: ["Number", "Number.xyz", "let Number = 0; Number.MIN_SAFE_INTEGER"],
    invalid: [
        {
            code: "Number.MIN_SAFE_INTEGER",
            errors: ["ES2015 'Number.MIN_SAFE_INTEGER' property is forbidden."],
        },
    ],
})
