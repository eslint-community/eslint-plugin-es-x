/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-y-flag.js")

new RuleTester().run("no-regexp-y-flag", rule, {
    valid: [
        "/foo/gimsu",
        "a\n/b/y",
        "new RegExp('foo')",
        "new RegExp('foo', 'gimsu')",
        "new RegExp('foo', flags)",
        "const flags = 'gimsu'; new RegExp('foo', flags)",
    ],
    invalid: [
        {
            code: "/foo/y",
            errors: ["ES2015 RegExp 'y' flag is forbidden."],
        },
        {
            code: "/foo/gimsuy",
            errors: ["ES2015 RegExp 'y' flag is forbidden."],
        },
        {
            code: "new RegExp('foo', 'y')",
            errors: ["ES2015 RegExp 'y' flag is forbidden."],
        },
        {
            code: "new RegExp('foo', 'gimsuy')",
            errors: ["ES2015 RegExp 'y' flag is forbidden."],
        },
        {
            code:
                "const pattern = 'foo', flags = 'gimsuy', regex = new RegExp(pattern, flags)",
            errors: ["ES2015 RegExp 'y' flag is forbidden."],
        },
    ],
})
