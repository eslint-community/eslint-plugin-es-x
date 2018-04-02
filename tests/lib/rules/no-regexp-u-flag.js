/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-u-flag.js")

new RuleTester().run("no-regexp-u-flag", rule, {
    valid: ["/foo/gimsy", "a\n/b/u"],
    invalid: [
        {
            code: "/foo/u",
            errors: ["ES2015 RegExp 'u' flag is forbidden."],
        },
        {
            code: "/foo/gimsuy",
            errors: ["ES2015 RegExp 'u' flag is forbidden."],
        },
    ],
})
