"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-iterator.js")

new RuleTester({
    languageOptions: { globals: { Iterator: "readonly" } },
}).run("no-iterator", rule, {
    valid: [
        "Array.from(object)",
        "const Iterator = Array; Iterator.from(object)",
    ],
    invalid: [
        {
            code: "Iterator.from(object)",
            errors: ["ES2025 'Iterator' class is forbidden."],
        },
        {
            code: "Iterator",
            errors: ["ES2025 'Iterator' class is forbidden."],
        },
    ],
})
