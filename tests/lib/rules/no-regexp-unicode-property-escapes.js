/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-unicode-property-escapes.js")

new RuleTester().run("no-regexp-unicode-property-escapes", rule, {
    valid: [
        "/p{Letter}/",
        "/P{Letter}/",
        "/\\p{Letter}/",
        "/\\P{Letter}/",
        "/\\\\p{Letter}/",
        "/\\\\P{Letter}/",
    ],
    invalid: [
        {
            code: "/\\p{Letter}/u",
            errors: [
                "ES2018 RegExp Unicode property escape sequences are forbidden.",
            ],
        },
        {
            code: "/\\P{Letter}/u",
            errors: [
                "ES2018 RegExp Unicode property escape sequences are forbidden.",
            ],
        },
        {
            code: "/\\\\\\p{Letter}/u",
            errors: [
                "ES2018 RegExp Unicode property escape sequences are forbidden.",
            ],
        },
        {
            code: "/\\\\\\P{Letter}/u",
            errors: [
                "ES2018 RegExp Unicode property escape sequences are forbidden.",
            ],
        },
        {
            code: "/\\p{Script=Hiragana}/u",
            errors: [
                "ES2018 RegExp Unicode property escape sequences are forbidden.",
            ],
        },
    ],
})
