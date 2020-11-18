/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-logical-assignment-operators.js")

if (!RuleTester.isSupported(2021)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-logical-assignment-operators.")
    return
}

new RuleTester().run("no-logical-assignment-operators", rule, {
    valid: [
        "x = x || y",
        "x = x && y",
        "x = x ?? y",
        "x += y",
        "x -= y",
        "x **= y",
    ],
    invalid: [
        {
            code: "x ||= y",
            output: "x = x || (y)",
            errors: ["ES2021 logical assignment operators are forbidden."],
        },
        {
            code: "x &&= y",
            output: "x = x && (y)",
            errors: ["ES2021 logical assignment operators are forbidden."],
        },
        {
            code: "x ??= y",
            output: "x = x ?? (y)",
            errors: ["ES2021 logical assignment operators are forbidden."],
        },
        {
            code: "a.b ||= c",
            output: "a.b = a.b || (c)",
            errors: ["ES2021 logical assignment operators are forbidden."],
        },
        {
            code: "a().b ||= c",
            output: null,
            errors: ["ES2021 logical assignment operators are forbidden."],
        },
        {
            code: "a &&= (c + d)",
            output: "a = a && (c + d)",
            errors: ["ES2021 logical assignment operators are forbidden."],
        },
    ],
})
