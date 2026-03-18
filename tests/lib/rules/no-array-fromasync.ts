"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-fromasync")

new RuleTester().run("no-array-fromasync", rule, {
    valid: [
        "Array",
        "Array.from",
        "let Array = 0; Array.fromAsync",
        {
            code: "if (Array.fromAsync) { Array.fromAsync }",
            options: [{ allowTestedProperty: true }],
        },
        {
            code: "if (Array.fromAsync) { Array.fromAsync }",
            settings: { "es-x": { allowTestedProperty: true } },
        },
        {
            code: "if (Array.fromAsync) { const {fromAsync} = Array }",
            options: [{ allowTestedProperty: true }],
        },
    ],
    invalid: [
        {
            code: "Array.fromAsync",
            errors: ["ES2026 'Array.fromAsync' method is forbidden."],
        },
        {
            code: "const {fromAsync} = Array",
            errors: ["ES2026 'Array.fromAsync' method is forbidden."],
        },
        {
            code: "const {a:{fromAsync} = Array} = {}",
            errors: ["ES2026 'Array.fromAsync' method is forbidden."],
        },
        {
            code: "if (Array.fromAsync) { Array.fromAsync }",
            errors: 2,
        },
        {
            code: "if (Array.fromAsync) {  }",
            options: [{ allowTestedProperty: true }],
            errors: ["ES2026 'Array.fromAsync' method is forbidden."],
        },
    ],
})
