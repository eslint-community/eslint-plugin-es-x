/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-lookbehind-assertions.js")

new RuleTester().run("no-regexp-lookbehind-assertions", rule, {
    valid: [
        "/(?=a)b/",
        "/(?!a)b/",
        "/(\\?=a)b/",
        "/(\\?!a)b/",
        "/\\(?<=a\\)b/",
        "/\\(?<!a\\)b/",
        "/\\\\\\(?<=a\\)b/",
        "/\\\\\\(?<!a\\)b/",
    ],
    invalid: [
        {
            code: "/(?<=a)b/",
            errors: ["ES2018 RegExp lookbehind assertions are forbidden."],
        },
        {
            code: "/(?<!a)b/",
            errors: ["ES2018 RegExp lookbehind assertions are forbidden."],
        },
        {
            code: "/\\\\(?<=a)b/",
            errors: ["ES2018 RegExp lookbehind assertions are forbidden."],
        },
        {
            code: "/\\\\(?<!a)b/",
            errors: ["ES2018 RegExp lookbehind assertions are forbidden."],
        },
        {
            code: "/\\(?<=a\\)(?<=a)b/",
            errors: ["ES2018 RegExp lookbehind assertions are forbidden."],
        },
        {
            code: "/\\(?<!a\\)\\\\(?<!a)b/",
            errors: ["ES2018 RegExp lookbehind assertions are forbidden."],
        },
    ],
})
