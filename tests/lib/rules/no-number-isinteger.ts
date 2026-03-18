/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-number-isinteger.js")

new RuleTester().run("no-number-isinteger", rule, {
    valid: ["Number", "Number.xyz", "let Number = 0; Number.isInteger"],
    invalid: [
        {
            code: "Number.isInteger",
            errors: ["ES2015 'Number.isInteger' method is forbidden."],
        },
    ],
})
