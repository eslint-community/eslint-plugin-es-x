"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-suppressederror.js")

new RuleTester().run("no-suppressederror", rule, {
    valid: ["Array", "Object", "let SuppressedError = 0; SuppressedError"],
    invalid: [
        {
            code: "SuppressedError",
            errors: ["ES2026 'SuppressedError' class is forbidden."],
        },
        {
            code: "function f() { SuppressedError }",
            errors: ["ES2026 'SuppressedError' class is forbidden."],
        },
    ],
})
