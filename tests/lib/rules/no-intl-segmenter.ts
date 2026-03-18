"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-intl-segmenter.js")

new RuleTester().run("no-intl-segmenter", rule, {
    valid: [
        "Intl",
        "Intl.DateTimeFormat",
        "Intl.NumberFormat",
        "let Intl = 0; Intl.Segmenter",
    ],
    invalid: [
        {
            code: "Intl.Segmenter",
            errors: ["ES2022 Intl API 'Intl.Segmenter' object is forbidden."],
        },
    ],
})
