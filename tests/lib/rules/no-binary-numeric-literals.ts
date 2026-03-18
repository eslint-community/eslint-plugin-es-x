/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-binary-numeric-literals.js")

new RuleTester().run("no-binary-numeric-literals", rule, {
    valid: ["1", "1e10", "01", "0x1", "0o1", "0O1", "'0b01'", "'0B01'"],
    invalid: [
        {
            code: "0b01",
            errors: ["ES2015 binary numeric literals are forbidden."],
        },
        {
            code: "0B01",
            errors: ["ES2015 binary numeric literals are forbidden."],
        },
    ],
})
