"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-symbol-asyncdispose.js")

new RuleTester().run("no-symbol-asyncdispose", rule, {
    valid: ["Symbol", "Symbol.length", "let Symbol = 0; Symbol.asyncDispose"],
    invalid: [
        {
            code: "Symbol.asyncDispose",
            errors: ["ES2025 'Symbol.asyncDispose' property is forbidden."],
        },
    ],
})
