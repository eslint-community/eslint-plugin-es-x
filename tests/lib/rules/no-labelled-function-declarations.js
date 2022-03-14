"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-labelled-function-declarations.js")

if (!RuleTester.isSupported(2022)) {
    //eslint-disable-next-line no-console
    console.log("Skip the tests of no-labelled-function-declarations.")
    return
}

new RuleTester({
    parserOptions: { sourceType: "script" },
}).run("no-labelled-function-declarations", rule, {
    valid: ["function f() {}", "label: { function f() {} }"],
    invalid: [
        {
            code: "label: function f() {}",
            errors: [
                "Annex B feature labelled function declarations are forbidden.",
            ],
        },
    ],
})
