/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-promise-try.js")

new RuleTester().run("no-promise-try", rule, {
    valid: ["Promise.all"],
    invalid: [
        {
            code: "Promise.try",
            errors: ["ES2025 'Promise.try' is forbidden."],
        },
    ],
})
