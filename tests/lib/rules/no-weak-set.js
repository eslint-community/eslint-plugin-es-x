/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-weak-set.js")

new RuleTester().run("no-weak-set", rule, {
    valid: ["Array", "Object", "let WeakSet = 0; WeakSet"],
    invalid: [
        {
            code: "WeakSet",
            errors: ["ES2015 'WeakSet' class is forbidden."],
        },
        {
            code: "function f() { WeakSet }",
            errors: ["ES2015 'WeakSet' class is forbidden."],
        },
    ],
})
