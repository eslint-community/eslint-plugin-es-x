"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-float16array.js")

new RuleTester().run("no-float16array", rule, {
    valid: ["Array", "Object", "let Float16Array = 0; Float16Array"],
    invalid: [
        {
            code: "Float16Array",
            errors: ["ES2025 'Float16Array' class is forbidden."],
        },
        {
            code: "function f() { Float16Array }",
            errors: ["ES2025 'Float16Array' class is forbidden."],
        },
    ],
})
