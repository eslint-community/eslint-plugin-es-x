"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-intl-relativetimeformat")

new RuleTester().run("no-intl-relativetimeformat", rule, {
    valid: [
        "Intl",
        "Intl.DateTimeFormat",
        "Intl.NumberFormat",
        "let Intl = 0; Intl.RelativeTimeFormat",
    ],
    invalid: [
        {
            code: "Intl.RelativeTimeFormat",
            errors: [
                "ES2020 Intl API 'Intl.RelativeTimeFormat' object is forbidden.",
            ],
        },
    ],
})
