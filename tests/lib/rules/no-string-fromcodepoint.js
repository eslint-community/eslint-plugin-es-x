/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-string-fromcodepoint.js")

new RuleTester().run("no-string-fromcodepoint", rule, {
    valid: ["String", "String.raw", "let String = 0; String.fromCodePoint"],
    invalid: [
        {
            code: "String.fromCodePoint",
            errors: ["ES2015 'String.fromCodePoint' method is forbidden."],
        },
    ],
})
