"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-intl-locale")

new RuleTester().run("no-intl-locale", rule, {
    valid: [
        "Intl",
        "Intl.DateTimeFormat",
        "Intl.NumberFormat",
        "let Intl = 0; Intl.Locale",
    ],
    invalid: [
        {
            code: "Intl.Locale",
            errors: ["ES2020 Intl API 'Intl.Locale' object is forbidden."],
        },
    ],
})
