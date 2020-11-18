/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-aggregate-error.js")

new RuleTester({ globals: { AggregateError: false } }).run(
    "no-aggregate-error",
    rule,
    {
        valid: ["RangeError"],
        invalid: [
            {
                code: "AggregateError",
                errors: ["ES2021 'AggregateError' class is forbidden."],
            },
            {
                code: "console.log(e instanceof AggregateError)",
                errors: ["ES2021 'AggregateError' class is forbidden."],
            },
        ],
    }
)
