"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-using-declarations.js")

// if (!RuleTester.isSupported(2026)) {
//     //eslint-disable-next-line no-console
//     console.log("Skip the tests of no-using-declarations.")
//     return
// }

new RuleTester({
    languageOptions: {
        sourceType: "module",
        parser: require("@typescript-eslint/parser"), // espree does not support `using` yet.
    },
}).run("no-using-declarations", rule, {
    valid: ["let x = y", "const x = y", "var x = y", "const x = await y"],
    invalid: [
        {
            code: "using x = y",
            errors: ["ES2026 'using' declarations are forbidden."],
        },
        {
            code: "await using x = y",
            errors: ["ES2026 'await using' declarations are forbidden."],
        },
    ],
})
