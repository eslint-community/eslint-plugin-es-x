/**
 * @author Yosuke Ota
 * See LICENSE file in root directory for full license.
 */
"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-d-flag.js")

// if (!RuleTester.isSupported(2022)) {
//     //eslint-disable-next-line no-console
//     console.log("Skip the tests of no-regexp-d-flag.")
//     return
// }

new RuleTester({
    parser: require.resolve("espree"), // espree v8.0.0-beta.x
    parserOptions: {
        ecmaVersion: 2022,
    },
}).run("no-regexp-d-flag", rule, {
    valid: [
        "/foo/gimuys",
        "a\n/b/d",
        "new RegExp('foo', 'gimuys')",
        "new RegExp('foo')",
        "new RegExp('foo', flags)",
        "const flags = 'gimuys'; new RegExp('foo', flags)",
    ],
    invalid: [
        {
            code: "/foo/d",
            errors: ["ES2022 RegExp 'd' flag is forbidden."],
        },
        {
            code: "/foo/gimsuyd",
            errors: ["ES2022 RegExp 'd' flag is forbidden."],
        },
        {
            code: "new RegExp('foo', 'd')",
            errors: ["ES2022 RegExp 'd' flag is forbidden."],
        },
        {
            code: "new RegExp('foo', 'gimsuyd')",
            errors: ["ES2022 RegExp 'd' flag is forbidden."],
        },
        {
            code: "const flags = 'd'; new RegExp('foo', flags)",
            errors: ["ES2022 RegExp 'd' flag is forbidden."],
        },
    ],
})
