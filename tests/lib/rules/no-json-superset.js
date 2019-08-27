/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-json-superset.js")

if (!RuleTester.isSupported(2019)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-json-superset.")
    return
}

new RuleTester().run("no-json-superset", rule, {
    valid: [
        "let a = null",
        "let a = '\\u2028'",
        "let a = '\\u2029'",
        "let a = '\\\u2028'",
        "let a = '\\\u2029'",
    ],
    invalid: [
        {
            code: "let a = '\u2028'",
            output: "let a = '\\u2028'",
            errors: ["ES2019 '\\u2028' in string literals is forbidden."],
        },
        {
            code: "let a = '\u2029'",
            output: "let a = '\\u2029'",
            errors: ["ES2019 '\\u2029' in string literals is forbidden."],
        },
        {
            code: "let a = '\u2028 and \u2029'",
            output: "let a = '\\u2028 and \\u2029'",
            errors: [
                "ES2019 '\\u2028' in string literals is forbidden.",
                "ES2019 '\\u2029' in string literals is forbidden.",
            ],
        },
    ],
})
