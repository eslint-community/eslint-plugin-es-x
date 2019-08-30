/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-promise-all-settled.js")

if (!RuleTester.isSupported(2020)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-promise-all-settled.")
    return
}

new RuleTester().run("no-promise-all-settled", rule, {
    valid: ["Promise.all"],
    invalid: [
        {
            code: "Promise.allSettled",
            errors: ["ES2020 'Promise.allSettled' function is forbidden."],
        },
    ],
})
