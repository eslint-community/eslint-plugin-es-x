"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-uint8array-frombase64.js")
const ruleId = "no-uint8array-frombase64"

const method = "fromBase64"

new RuleTester().run(ruleId, rule, {
    valid: [
        "Uint8Array",
        "Uint8Array.raw",
        `let Uint8Array = 0; Uint8Array.${method}`,
        {
            code: `if (Uint8Array.${method}) { Uint8Array.${method} }`,
            options: [{ allowTestedProperty: true }],
        },
    ],
    invalid: [
        {
            code: `Uint8Array.${method}`,
            errors: [`ES2026 'Uint8Array.${method}' method is forbidden.`],
        },
        {
            code: `if (Uint8Array.${method}) { Uint8Array.${method} }`,
            errors: 2,
        },
    ],
})
