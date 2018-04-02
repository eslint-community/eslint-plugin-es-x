/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-template-literals.js")

new RuleTester().run("no-template-literals", rule, {
    valid: ["'foo'", '"bar"'],
    invalid: [
        {
            code: "`foo`",
            errors: ["ES2015 template literals are forbidden."],
        },
        {
            code: "tag`foo`",
            errors: ["ES2015 template literals are forbidden."],
        },
        {
            //eslint-disable-next-line no-template-curly-in-string
            code: "`foo${a}bar${b}baz`",
            errors: ["ES2015 template literals are forbidden."],
        },
    ],
})
