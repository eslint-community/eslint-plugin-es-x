"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-temporal.js")

new RuleTester().run("no-temporal", rule, {
    valid: ["Array", "Object", "let Temporal = 0; Temporal"],
    invalid: [
        {
            code: "Temporal",
            errors: ["ES2026 'Temporal' class is forbidden."],
        },
        {
            code: "function f() { Temporal }",
            errors: ["ES2026 'Temporal' class is forbidden."],
        },
    ],
})
