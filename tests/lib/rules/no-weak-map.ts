/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-weak-map.js")

new RuleTester().run("no-weak-map", rule, {
    valid: ["Array", "Object", "let WeakMap = 0; WeakMap"],
    invalid: [
        {
            code: "WeakMap",
            errors: ["ES2015 'WeakMap' class is forbidden."],
        },
        {
            code: "function f() { WeakMap }",
            errors: ["ES2015 'WeakMap' class is forbidden."],
        },
    ],
})
