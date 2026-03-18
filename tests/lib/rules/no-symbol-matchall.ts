"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-symbol-matchall.js")

new RuleTester().run("no-symbol-matchall", rule, {
    valid: ["Symbol", "Symbol.length", "let Symbol = 0; Symbol.matchAll"],
    invalid: [
        {
            code: "Symbol.matchAll",
            errors: ["ES2020 'Symbol.matchAll' property is forbidden."],
        },
    ],
})
