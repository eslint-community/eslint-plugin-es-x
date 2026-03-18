/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-u-flag.js")

new RuleTester().run("no-regexp-u-flag", rule, {
    valid: [
        "/foo/",
        "/foo/gimsy",
        "a\n/b/u",
        "new RegExp('foo')",
        "new RegExp('foo', 'gimsy')",
        "new RegExp('foo', flags)",
    ],
    invalid: [
        {
            code: "/foo/u",
            errors: ["ES2015 RegExp 'u' flag is forbidden."],
        },
        {
            code: "/foo/gimsuy",
            errors: ["ES2015 RegExp 'u' flag is forbidden."],
        },
        {
            code: "new RegExp('foo', 'u')",
            errors: ["ES2015 RegExp 'u' flag is forbidden."],
        },
        {
            code: "new RegExp('foo', 'gimsuy')",
            errors: ["ES2015 RegExp 'u' flag is forbidden."],
        },
        {
            code: "const flags= 'u'; new RegExp('foo', flags)",
            errors: ["ES2015 RegExp 'u' flag is forbidden."],
        },
    ],
})
