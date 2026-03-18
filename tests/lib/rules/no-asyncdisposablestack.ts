"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-asyncdisposablestack.js")

new RuleTester().run("no-asyncdisposablestack", rule, {
    valid: [
        "Array",
        "Object",
        "let AsyncDisposableStack = 0; AsyncDisposableStack",
    ],
    invalid: [
        {
            code: "AsyncDisposableStack",
            errors: ["ES2026 'AsyncDisposableStack' class is forbidden."],
        },
        {
            code: "function f() { AsyncDisposableStack }",
            errors: ["ES2026 'AsyncDisposableStack' class is forbidden."],
        },
    ],
})
