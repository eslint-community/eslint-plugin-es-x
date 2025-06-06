"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-disposablestack.js")

new RuleTester().run("no-disposablestack", rule, {
    valid: ["Array", "Object", "let DisposableStack = 0; DisposableStack"],
    invalid: [
        {
            code: "DisposableStack",
            errors: ["ES2026 'DisposableStack' class is forbidden."],
        },
        {
            code: "function f() { DisposableStack }",
            errors: ["ES2026 'DisposableStack' class is forbidden."],
        },
    ],
})
