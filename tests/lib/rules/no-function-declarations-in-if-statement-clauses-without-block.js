"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-function-declarations-in-if-statement-clauses-without-block.js")

new RuleTester().run("no-function-declarations-in-if-statement-clauses", rule, {
    valid: [],
    invalid: [],
})

new RuleTester({
    languageOptions: { sourceType: "script" },
}).run("no-function-declarations-in-if-statement-clauses-without-block", rule, {
    valid: [
        "function f() {}",
        "if (a) { function f() {} } else { function f() {} }",
    ],
    invalid: [
        {
            code: "if (a) function f() {}",
            output: "if (a) {function f() {}}",
            errors: [
                "Annex B feature the function declarations in if statement clauses without using blocks are forbidden.",
            ],
        },
        {
            code: "if (a); else function f() {}",
            output: "if (a); else {function f() {}}",
            errors: [
                "Annex B feature the function declarations in if statement clauses without using blocks are forbidden.",
            ],
        },
        {
            code: "if (a) function f1() {} else function f2() {}",
            output: "if (a) {function f1() {}} else {function f2() {}}",
            errors: [
                "Annex B feature the function declarations in if statement clauses without using blocks are forbidden.",
                "Annex B feature the function declarations in if statement clauses without using blocks are forbidden.",
            ],
        },
    ],
})
