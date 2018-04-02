/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-y-flag.js")

new RuleTester().run("no-regexp-y-flag", rule, {
    valid: ["/foo/gimsu", "a\n/b/y"],
    invalid: [
        {
            code: "/foo/y",
            errors: ["ES2015 RegExp 'y' flag is forbidden."],
        },
        {
            code: "/foo/gimsuy",
            errors: ["ES2015 RegExp 'y' flag is forbidden."],
        },
    ],
})
