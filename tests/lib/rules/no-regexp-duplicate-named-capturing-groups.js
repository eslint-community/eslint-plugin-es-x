"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-duplicate-named-capturing-groups.js")

if (!RuleTester.isSupported(2025)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-regexp-duplicate-named-capturing-groups.")
    return
}

new RuleTester().run("no-regexp-duplicate-named-capturing-groups", rule, {
    valid: [
        String.raw`/(?<x>a)/`,
        String.raw`/(a)/`,
        String.raw`/(?<x>a)(?<y>b)/`,
        String.raw`/(?<x>a)(b)/`,
        String.raw`/(?<x>a)|(?<y>b)/`,
        String.raw`new RegExp("(?<x>a)")`,
        String.raw`new RegExp("(a)")`,
        String.raw`new RegExp("(?<x>a)(?<y>b)")`,
        String.raw`new RegExp("(?<x>a)(b)")`,
        String.raw`new RegExp("(?<x>a)|(?<y>b)")`,
    ],
    invalid: [
        {
            code: String.raw`/(?<x>a)|(?<x>b)/`,
            errors: [
                {
                    message:
                        "ES2025 RegExp duplicate named capturing groups are forbidden.",
                    column: 10,
                },
            ],
        },
        {
            code: String.raw`/(?<x>a)|(?<x>b)|(?<x>c)/`,
            errors: [
                {
                    message:
                        "ES2025 RegExp duplicate named capturing groups are forbidden.",
                    column: 10,
                },
            ],
        },
        {
            code: String.raw`new RegExp("(?<x>a)|(?<x>b)")`,
            errors: [
                {
                    message:
                        "ES2025 RegExp duplicate named capturing groups are forbidden.",
                    column: 1,
                },
            ],
        },
        {
            code: String.raw`new RegExp("(?<x>a)|(?<x>b)|(?<x>c)")`,
            errors: [
                {
                    message:
                        "ES2025 RegExp duplicate named capturing groups are forbidden.",
                    column: 1,
                },
            ],
        },
        {
            code: String.raw`/(?<x>a)|(?<y>b)|(?<x>c)/`,
            errors: [
                {
                    message:
                        "ES2025 RegExp duplicate named capturing groups are forbidden.",
                    column: 18,
                },
            ],
        },
    ],
})
