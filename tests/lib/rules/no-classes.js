/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-classes.js")

new RuleTester().run("no-classes", rule, {
    valid: ["function A() {} A.prototype.foo = function() {}"],
    invalid: [
        {
            code: "class A {}",
            errors: ["ES2015 class declarations are forbidden."],
        },
        {
            code: "(class {})",
            errors: ["ES2015 class declarations are forbidden."],
        },
    ],
})
