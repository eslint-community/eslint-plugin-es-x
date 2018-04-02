/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-arrow-functions.js")

new RuleTester().run("no-arrow-functions", rule, {
    valid: ["function f() {}", "const f = function() {}"],
    invalid: [
        {
            code: "() => 1",
            errors: ["ES2015 arrow function expressions are forbidden."],
        },
        {
            code: "() => {}",
            errors: ["ES2015 arrow function expressions are forbidden."],
        },
    ],
})
