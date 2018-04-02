/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-s-flag.js")

new RuleTester().run("no-regexp-s-flag", rule, {
    valid: ["/foo/gimuy", "a\n/b/s"],
    invalid: [
        {
            code: "/foo/s",
            errors: ["ES2018 RegExp 's' flag is forbidden."],
        },
        {
            code: "/foo/gimsuy",
            errors: ["ES2018 RegExp 's' flag is forbidden."],
        },
    ],
})
