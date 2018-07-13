/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-lookbehind-assertions.js")

new RuleTester().run("no-regexp-lookbehind-assertions", rule, {
    valid: [
        String.raw`/(?=a)b/`,
        String.raw`/(?!a)b/`,
        String.raw`/(\?<=a)b/`,
        String.raw`/(\?<!a)b/`,
        String.raw`/\(?<=a\)b/`,
        String.raw`/\(?<!a\)b/`,
        String.raw`/\\\(?<=a\)b/`,
        String.raw`/\\\(?<!a\)b/`,
        String.raw`new RegExp("(?=a)b")`,
        String.raw`new RegExp("(?!a)b")`,
        String.raw`new RegExp("(\\?<=a)b")`,
        String.raw`new RegExp("(\\?<!a)b")`,
        String.raw`new RegExp("\\(?<=a\\)b")`,
        String.raw`new RegExp("\\(?<!a\\)b")`,

        // Allow those in character classes.
        String.raw`/[(?<=a)b]/`,
        String.raw`/[(?<!a)b]/`,

        // Ignore syntax errors.
        String.raw`new RegExp("(?<=a(", "u")`,
    ],
    invalid: [
        {
            code: String.raw`/(?<=a)b/`,
            errors: ["ES2018 RegExp lookbehind assertions are forbidden."],
        },
        {
            code: String.raw`/(?<!a)b/`,
            errors: ["ES2018 RegExp lookbehind assertions are forbidden."],
        },
        {
            code: String.raw`/\\(?<=a)b/`,
            errors: ["ES2018 RegExp lookbehind assertions are forbidden."],
        },
        {
            code: String.raw`/\\(?<!a)b/`,
            errors: ["ES2018 RegExp lookbehind assertions are forbidden."],
        },
        {
            code: String.raw`/\(?<=a\)(?<=a)b/`,
            errors: ["ES2018 RegExp lookbehind assertions are forbidden."],
        },
        {
            code: String.raw`/\(?<!a\)\\(?<!a)b/`,
            errors: ["ES2018 RegExp lookbehind assertions are forbidden."],
        },
        {
            code: String.raw`new RegExp("(?<=a)b")`,
            errors: ["ES2018 RegExp lookbehind assertions are forbidden."],
        },
        {
            code: String.raw`new RegExp("(?<!a)b")`,
            errors: ["ES2018 RegExp lookbehind assertions are forbidden."],
        },
        {
            code: String.raw`new RegExp("\\\\(?<=a)b")`,
            errors: ["ES2018 RegExp lookbehind assertions are forbidden."],
        },
        {
            code: String.raw`new RegExp("\\\\(?<!a)b")`,
            errors: ["ES2018 RegExp lookbehind assertions are forbidden."],
        },
    ],
})
