/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-malformed-template-literals.js")

new RuleTester().run("no-malformed-template-literals", rule, {
    valid: ["`foo`", "tag`foo`", "tag``"],
    invalid: [
        {
            code: "tag`\\unicode`",
            errors: [
                "ES2018 template literals with invalid escape sequences are forbidden.",
            ],
        },
        {
            //eslint-disable-next-line no-template-curly-in-string
            code: "tag`\\unicode${a}\\unicode${b}\\unicode${c}unicode`",
            errors: [
                "ES2018 template literals with invalid escape sequences are forbidden.",
            ],
        },
    ],
})
