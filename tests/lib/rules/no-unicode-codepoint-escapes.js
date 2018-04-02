/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-unicode-codepoint-escapes.js")

new RuleTester().run("no-unicode-codepoint-escapes", rule, {
    valid: [
        "foo = 1",
        "\\u0045 = 1",
        "'foo'",
        "'\\u0045'",
        "'u{20}'",
        "'\\\\u{20}'",
        "`foo`",
        "`\\u0045`",
        "`u{20}`",
        "`\\\\u{20}`",
        "tag`\\unicode`",
        "tag`\\u{ZZZ}`",
    ],
    invalid: [
        {
            code: "\\u{45} = 1",
            errors: [
                "ES2015 Unicode code point escape sequences are forbidden.",
            ],
        },
        {
            code: "a\\u{45}b = 1",
            errors: [
                "ES2015 Unicode code point escape sequences are forbidden.",
            ],
        },
        {
            code: "'\\u{45}'",
            errors: [
                "ES2015 Unicode code point escape sequences are forbidden.",
            ],
        },
        {
            code: "'a\\u{45}b'",
            errors: [
                "ES2015 Unicode code point escape sequences are forbidden.",
            ],
        },
        {
            code: "`\\u{45}`",
            errors: [
                "ES2015 Unicode code point escape sequences are forbidden.",
            ],
        },
        {
            code: "tag`\\u{45}`",
            errors: [
                "ES2015 Unicode code point escape sequences are forbidden.",
            ],
        },
        {
            //eslint-disable-next-line no-template-curly-in-string
            code: "`\\u{45}${a}\\u{46}`",
            errors: [
                "ES2015 Unicode code point escape sequences are forbidden.",
            ],
        },
        {
            //eslint-disable-next-line no-template-curly-in-string
            code: "tag`\\u{45}${a}\\u{46}`",
            errors: [
                "ES2015 Unicode code point escape sequences are forbidden.",
            ],
        },
        {
            //eslint-disable-next-line no-template-curly-in-string
            code: "tag`\\u{XXXZX}${a}\\u{46}`",
            errors: [
                "ES2015 Unicode code point escape sequences are forbidden.",
            ],
        },
    ],
})
