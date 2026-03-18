/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-new-target.js")

new RuleTester().run("no-new-target", rule, {
    valid: ["new F()", "target = 1"],
    invalid: [
        {
            code: "class A { constructor() { new.target } }",
            errors: ["ES2015 'new.target' meta property is forbidden."],
        },
    ],
})
