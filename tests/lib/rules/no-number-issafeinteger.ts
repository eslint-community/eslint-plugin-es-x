/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-number-issafeinteger.js")

new RuleTester().run("no-number-issafeinteger", rule, {
    valid: ["Number", "Number.xyz", "let Number = 0; Number.isSafeInteger"],
    invalid: [
        {
            code: "Number.isSafeInteger",
            errors: ["ES2015 'Number.isSafeInteger' method is forbidden."],
        },
    ],
})
