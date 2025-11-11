"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-iterator-concat.js")

new RuleTester().run("no-iterator-concat", rule, {
    valid: ["Iterator", "Iterator.length", "let Iterator = 0; Iterator.concat"],
    invalid: [
        {
            code: "Iterator.concat",
            errors: ["ES2026 'Iterator.concat' method is forbidden."],
        },
    ],
})
