/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-number-epsilon.js")

new RuleTester().run("no-number-epsilon", rule, {
    valid: ["Number", "Number.xyz", "let Number = 0; Number.EPSILON"],
    invalid: [
        {
            code: "Number.EPSILON",
            errors: ["ES2015 'Number.EPSILON' property is forbidden."],
        },
    ],
})
