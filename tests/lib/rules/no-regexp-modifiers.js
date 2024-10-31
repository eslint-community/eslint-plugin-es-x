"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-modifiers.js")

if (!RuleTester.isSupported(2025)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-regexp-modifiers.")
    return
}

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
