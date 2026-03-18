/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-shared-array-buffer.js")

new RuleTester().run("no-shared-array-buffer", rule, {
    valid: ["Array", "Object", "let SharedArrayBuffer = 0; SharedArrayBuffer"],
    invalid: [
        {
            code: "SharedArrayBuffer",
            errors: ["ES2017 'SharedArrayBuffer' class is forbidden."],
        },
        {
            code: "function f() { SharedArrayBuffer }",
            errors: ["ES2017 'SharedArrayBuffer' class is forbidden."],
        },
    ],
})
