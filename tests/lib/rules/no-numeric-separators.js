/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-numeric-separators.js")

if (!RuleTester.isSupported(2021)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-numeric-separators.")
    return
}

new RuleTester().run("no-numeric-separators", rule, {
    valid: [
        "123456",
        "-123",
        "123.456",
        "123.0",
        "NaN",
        "123e-1",
        "0x11",
        "0b11",
        "0o11",
        "Infinity",
        "123456n",
    ],
    invalid: [
        {
            code: "123_456",
            output: "123456",
            errors: ["ES2021 numeric separators are forbidden."],
        },
        {
            code: "5_000",
            output: "5000",
            errors: ["ES2021 numeric separators are forbidden."],
        },
        {
            code: "1_234_56",
            output: "123456",
            errors: ["ES2021 numeric separators are forbidden."],
        },
        {
            code: "5.00_00",
            output: "5.0000",
            errors: ["ES2021 numeric separators are forbidden."],
        },
        {
            code: "0b11_01",
            output: "0b1101",
            errors: ["ES2021 numeric separators are forbidden."],
        },
        {
            code: "5e1_000",
            output: "5e1000",
            errors: ["ES2021 numeric separators are forbidden."],
        },
        {
            code: "0xBE_EF",
            output: "0xBEEF",
            errors: ["ES2021 numeric separators are forbidden."],
        },
        {
            code: "123_456n",
            output: "123456n",
            errors: ["ES2021 numeric separators are forbidden."],
        },
    ],
})
