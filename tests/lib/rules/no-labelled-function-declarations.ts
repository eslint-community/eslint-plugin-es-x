"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-labelled-function-declarations.js")

new RuleTester({
    languageOptions: { sourceType: "script" },
}).run("no-labelled-function-declarations", rule, {
    valid: ["function f() {}", "label: { function f() {} }"],
    invalid: [
        {
            code: "label: function f() {}",
            errors: [
                "Annex B feature the labelled function declarations are forbidden.",
            ],
        },
    ],
})
