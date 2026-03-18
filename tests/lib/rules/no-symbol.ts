/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-symbol.js")

new RuleTester().run("no-symbol", rule, {
    valid: ["Array", "Object", "let Symbol = 0; Symbol"],
    invalid: [
        {
            code: "Symbol",
            errors: ["ES2015 'Symbol' class is forbidden."],
        },
        {
            code: "function f() { Symbol }",
            errors: ["ES2015 'Symbol' class is forbidden."],
        },
    ],
})
