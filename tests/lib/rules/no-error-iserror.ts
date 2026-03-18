"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-error-iserror.js")

new RuleTester().run("no-error-iserror", rule, {
    valid: [
        "Error",
        "Error.captureStackTrace",
        "let Error = 0; Error.isError",
        {
            code: "if (Error.isError) Error.isError(foo)",
            options: [{ allowTestedProperty: true }],
        },
    ],
    invalid: [
        {
            code: "Error.isError",
            errors: ["ES2026 'Error.isError' method is forbidden."],
        },
        {
            code: "if (Error.isError) Error.isError(foo)",
            errors: 2,
        },
        {
            code: "Error.isError(foo)",
            options: [{ allowTestedProperty: true }],
            errors: ["ES2026 'Error.isError' method is forbidden."],
        },
    ],
})
