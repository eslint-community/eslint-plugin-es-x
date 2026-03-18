/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-string-raw.js")

new RuleTester().run("no-string-raw", rule, {
    valid: ["String", "String.fromCodePoint", "let String = 0; String.raw"],
    invalid: [
        {
            code: "String.raw",
            errors: ["ES2015 'String.raw' method is forbidden."],
        },
    ],
})
