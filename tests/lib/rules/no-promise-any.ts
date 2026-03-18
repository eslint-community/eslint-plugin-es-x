/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-promise-any.js")

new RuleTester().run("no-promise-any", rule, {
    valid: ["Promise.all", "Error", "RangeError"],
    invalid: [
        {
            code: "Promise.any",
            errors: ["ES2021 'Promise.any' is forbidden."],
        },
        {
            code: "AggregateError",
            errors: ["ES2021 'AggregateError' is forbidden."],
        },
        {
            code: "console.log(e instanceof AggregateError)",
            errors: ["ES2021 'AggregateError' is forbidden."],
        },
    ],
})
