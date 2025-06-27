/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-promise-all-settled.js")

new RuleTester().run("no-promise-all-settled", rule, {
    valid: ["Promise.all"],
    invalid: [
        {
            code: "Promise.allSettled",
            errors: ["ES2020 'Promise.allSettled' function is forbidden."],
        },
    ],
})
