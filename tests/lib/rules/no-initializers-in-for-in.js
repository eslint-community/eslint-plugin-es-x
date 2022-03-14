"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-initializers-in-for-in.js")

new RuleTester().run("no-initializers-in-for-in", rule, {
    valid: [
        "for (var x in obj) {}",
        "for (let x in obj) {}",
        "for (var {x=42} in obj) {}",
    ],
    invalid: [
        {
            code: "for (var x=42 in obj) {}",
            errors: [
                "Annex B feature the initializers in for-in heads are forbidden.",
            ],
        },
    ],
})
