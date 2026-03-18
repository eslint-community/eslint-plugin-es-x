"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-math-f16round.js")

new RuleTester().run("no-math-f16round", rule, {
    valid: ["Math", "Math.min", "Math.max", "let Math = 0; Math.f16round"],
    invalid: [
        {
            code: "Math.f16round",
            errors: ["ES2025 'Math.f16round' method is forbidden."],
        },
    ],
})
