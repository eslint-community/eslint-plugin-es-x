/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-named-capture-groups.js")

new RuleTester().run("no-regexp-named-capture-groups", rule, {
    valid: ["/foo/", "/\\k<a>/", "/\\(?<a>a\\)b/", "/\\\\\\(?<a>a\\)b/"],
    invalid: [
        {
            code: "/(?<a>a)b/",
            errors: ["ES2018 RegExp named capture groups are forbidden."],
        },
        {
            code: "/(?<a>a)b\\k<a>/",
            errors: ["ES2018 RegExp named capture groups are forbidden."],
        },
        {
            code: "/\\\\(?<a>a)b/",
            errors: ["ES2018 RegExp named capture groups are forbidden."],
        },
        {
            code: "/\\(?<a>a\\)\\\\(?<a>a)b/",
            errors: ["ES2018 RegExp named capture groups are forbidden."],
        },
    ],
})
