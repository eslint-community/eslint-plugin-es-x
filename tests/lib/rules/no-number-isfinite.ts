/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-number-isfinite.js")

new RuleTester().run("no-number-isfinite", rule, {
    valid: ["Number", "Number.xyz", "let Number = 0; Number.isFinite"],
    invalid: [
        {
            code: "Number.isFinite",
            errors: ["ES2015 'Number.isFinite' method is forbidden."],
        },
    ],
})
