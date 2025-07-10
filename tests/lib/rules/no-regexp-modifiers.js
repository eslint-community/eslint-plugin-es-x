"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-modifiers.js")

new RuleTester().run("no-regexp-modifiers", rule, {
    valid: [
        String.raw`/(a)/i`,
        String.raw`/(?:a)/i`,
        String.raw`/(?<x>a)/`,
        String.raw`new RegExp("(a)", "i")`,
        String.raw`new RegExp("(?:a)", "i")`,
        String.raw`new RegExp("(?<x>a)")`,
    ],
    invalid: [
        {
            code: String.raw`/(?m:a)/i`,
            errors: [
                {
                    message: "ES2025 RegExp Modifiers are forbidden.",
                    column: 4,
                },
            ],
        },
        {
            code: String.raw`/(?m-i:a)/i`,
            errors: [
                {
                    message: "ES2025 RegExp Modifiers are forbidden.",
                    column: 4,
                },
            ],
        },
        {
            code: String.raw`/(?m-:a)/i`,
            errors: [
                {
                    message: "ES2025 RegExp Modifiers are forbidden.",
                    column: 4,
                },
            ],
        },
        {
            code: String.raw`/(?-i:a)/i`,
            errors: [
                {
                    message: "ES2025 RegExp Modifiers are forbidden.",
                    column: 4,
                },
            ],
        },
    ],
})
