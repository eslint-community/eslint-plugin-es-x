"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-symbol-dispose.js")

new RuleTester().run("no-symbol-dispose", rule, {
    valid: ["Symbol", "Symbol.length", "let Symbol = 0; Symbol.dispose"],
    invalid: [
        {
            code: "Symbol.dispose",
            errors: ["ES2025 'Symbol.dispose' property is forbidden."],
        },
    ],
})
