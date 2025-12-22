"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-atomics-waitasync.js")

new RuleTester().run("no-atomics-waitasync", rule, {
    valid: ["Atomics", "Atomics.wait", "let Atomics = 0; Atomics.waitAsync"],
    invalid: [
        {
            code: "Atomics.waitAsync",
            errors: ["ES2024 'Atomics.waitAsync' method is forbidden."],
        },
    ],
})
