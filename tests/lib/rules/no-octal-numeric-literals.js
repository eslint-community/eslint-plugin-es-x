/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-octal-numeric-literals.js")

new RuleTester().run("no-octal-numeric-literals", rule, {
    valid: ["123", "0123", "0x123", "0X123", "0b10", "0B10", "/*0o123*/x"],
    invalid: [
        {
            code: "0o123",
            errors: ["ES2015 octal numeric literals are forbidden."],
        },
        {
            code: "0O123",
            errors: ["ES2015 octal numeric literals are forbidden."],
        },
    ],
})
