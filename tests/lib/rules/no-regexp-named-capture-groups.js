/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-named-capture-groups.js")

new RuleTester().run("no-regexp-named-capture-groups", rule, {
    valid: [
        String.raw`/foo/`,
        String.raw`/\k<a>/`,
        String.raw`/\(?<a>a\)b/`,
        String.raw`/\\\(?<a>a\)b/`,
        String.raw`new RegExp('foo')`,
        String.raw`new RegExp('\\k<a>')`,
        String.raw`new RegExp('\\(?<a>a\\)b')`,
        String.raw`new RegExp('\\\\\\(?<a>a\\)b')`,

        // Capture groups but unnamed.
        "/(foo)\\1/",

        // Allow those in character classes.
        String.raw`/[(?<a>a)b]/`,
        String.raw`/[(?<a>a)b\k<a>]/`,

        // Ignore syntax errors.
        String.raw`new RegExp("(?<a", "u")`,
    ],
    invalid: [
        {
            code: String.raw`/(?<a>a)b/`,
            errors: ["ES2018 RegExp named capture groups are forbidden."],
        },
        {
            code: String.raw`/(?<a>a)b\k<a>/`,
            errors: ["ES2018 RegExp named capture groups are forbidden."],
        },
        {
            code: String.raw`/\\(?<a>a)b/`,
            errors: ["ES2018 RegExp named capture groups are forbidden."],
        },
        {
            code: String.raw`/\(?<a>a\)\\(?<a>a)b/`,
            errors: ["ES2018 RegExp named capture groups are forbidden."],
        },
        {
            code: String.raw`new RegExp("(?<a>a)b")`,
            errors: ["ES2018 RegExp named capture groups are forbidden."],
        },
        {
            code: String.raw`new RegExp("(?<a>a)b\\k<a>")`,
            errors: ["ES2018 RegExp named capture groups are forbidden."],
        },
        {
            code: String.raw`new RegExp("\\\\(?<a>a)b")`,
            errors: ["ES2018 RegExp named capture groups are forbidden."],
        },
        {
            code: String.raw`new RegExp("\\(?<a>a\\)\\\\(?<a>a)b")`,
            errors: ["ES2018 RegExp named capture groups are forbidden."],
        },
    ],
})
