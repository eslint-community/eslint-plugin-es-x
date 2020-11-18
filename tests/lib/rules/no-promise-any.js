/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-promise-any.js")

new RuleTester().run("no-promise-any", rule, {
    valid: ["Promise.all"],
    invalid: [
        {
            code: "Promise.any",
            errors: ["ES2021 'Promise.any' function is forbidden."],
        },
    ],
})
