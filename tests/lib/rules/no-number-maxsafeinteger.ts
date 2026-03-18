/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-number-maxsafeinteger.js")

new RuleTester().run("no-number-maxsafeinteger", rule, {
    valid: ["Number", "Number.xyz", "let Number = 0; Number.MAX_SAFE_INTEGER"],
    invalid: [
        {
            code: "Number.MAX_SAFE_INTEGER",
            errors: ["ES2015 'Number.MAX_SAFE_INTEGER' property is forbidden."],
        },
    ],
})
