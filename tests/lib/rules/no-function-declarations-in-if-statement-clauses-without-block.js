"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-function-declarations-in-if-statement-clauses-without-block.js")

new RuleTester().run("no-function-declarations-in-if-statement-clauses", rule, {
    valid: [],
    invalid: [],
})

new RuleTester({
    parserOptions: { sourceType: "script" },
}).run("no-function-declarations-in-if-statement-clauses-without-block", rule, {
    valid: [
        "function f() {}",
        "if (a) { function f() {} } else { function f() {} }",
    ],
    invalid: [
        {
            code: "if (a) function f() {}",
            errors: [
                "Annex B feature the function declarations in if statement clauses without using blocks are forbidden.",
            ],
        },
        {
            code: "if (a); else function f() {}",
            errors: [
                "Annex B feature the function declarations in if statement clauses without using blocks are forbidden.",
            ],
        },
    ],
})
