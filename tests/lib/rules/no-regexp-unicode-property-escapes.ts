/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-unicode-property-escapes.js")

new RuleTester().run("no-regexp-unicode-property-escapes", rule, {
    valid: [
        String.raw`/p{Letter}/`,
        String.raw`/P{Letter}/`,
        String.raw`/\p{Letter}/`,
        String.raw`/\P{Letter}/`,
        String.raw`/\\p{Letter}/`,
        String.raw`/\\P{Letter}/`,
        String.raw`new RegExp('p{Letter}')`,
        String.raw`new RegExp('P{Letter}')`,
        String.raw`new RegExp('\\p{Letter}')`,
        String.raw`new RegExp('\\P{Letter}')`,
        String.raw`new RegExp('\\\\p{Letter}')`,
        String.raw`new RegExp('\\\\P{Letter}')`,

        // Ignore syntax errors.
        String.raw`new RegExp('\\p{Letter', 'u')`,
    ],
    invalid: [
        {
            code: String.raw`/\p{Letter}/u`,
            errors: [
                "ES2018 RegExp Unicode property escape sequences are forbidden.",
            ],
        },
        {
            code: String.raw`/\P{Letter}/u`,
            errors: [
                "ES2018 RegExp Unicode property escape sequences are forbidden.",
            ],
        },
        {
            code: String.raw`/\\\p{Letter}/u`,
            errors: [
                "ES2018 RegExp Unicode property escape sequences are forbidden.",
            ],
        },
        {
            code: String.raw`/\\\P{Letter}/u`,
            errors: [
                "ES2018 RegExp Unicode property escape sequences are forbidden.",
            ],
        },
        {
            code: String.raw`/\p{Script=Hiragana}/u`,
            errors: [
                "ES2018 RegExp Unicode property escape sequences are forbidden.",
            ],
        },
        {
            code: String.raw`new RegExp('\\p{Letter}', 'u')`,
            errors: [
                "ES2018 RegExp Unicode property escape sequences are forbidden.",
            ],
        },
        {
            code: String.raw`new RegExp('\\P{Letter}', 'u')`,
            errors: [
                "ES2018 RegExp Unicode property escape sequences are forbidden.",
            ],
        },
        {
            code: String.raw`new RegExp('\\\\\\p{Letter}', 'u')`,
            errors: [
                "ES2018 RegExp Unicode property escape sequences are forbidden.",
            ],
        },
        {
            code: String.raw`new RegExp('\\\\\\P{Letter}', 'u')`,
            errors: [
                "ES2018 RegExp Unicode property escape sequences are forbidden.",
            ],
        },
        {
            code: String.raw`new RegExp('\\p{Script=Hiragana}', 'u')`,
            errors: [
                "ES2018 RegExp Unicode property escape sequences are forbidden.",
            ],
        },
        {
            code: String.raw`const pattern = '\\p{Script=Hiragana}', flags = 'u', regex = new RegExp(pattern, flags)`,
            errors: [
                "ES2018 RegExp Unicode property escape sequences are forbidden.",
            ],
        },

        // It's valid even if in character classes.
        {
            code: String.raw`/[\p{Letter}]/u`,
            errors: [
                "ES2018 RegExp Unicode property escape sequences are forbidden.",
            ],
        },
        {
            code: String.raw`/[\P{Letter}]/u`,
            errors: [
                "ES2018 RegExp Unicode property escape sequences are forbidden.",
            ],
        },
    ],
})
