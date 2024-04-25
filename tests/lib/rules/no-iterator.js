"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-iterator.js")

new RuleTester().run("no-iterator", rule, {
    valid: ["let Iterator = 0; Iterator"],
    invalid: [
        {
            code: "Iterator",
            errors: ["ES2025 'Iterator' class is forbidden."],
        },
        {
            code: "Iterator.parse",
            errors: ["ES2025 'Iterator' class is forbidden."],
        },
        {
            code: "Iterator.stringify",
            errors: ["ES2025 'Iterator' class is forbidden."],
        },
        {
            code: "Iterator.from([])",
            errors: ["ES2025 'Iterator' class is forbidden."],
        },
    ],
})
