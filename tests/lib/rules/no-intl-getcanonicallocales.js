"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-intl-getcanonicallocales")

new RuleTester().run("no-intl-getcanonicallocales", rule, {
    valid: [
        "Intl",
        "Intl.DateTimeFormat",
        "Intl.NumberFormat",
        "let Intl = 0; Intl.getCanonicalLocales",
    ],
    invalid: [
        {
            code: "Intl.getCanonicalLocales",
            errors: [
                "ES2016 Intl API 'Intl.getCanonicalLocales' method is forbidden.",
            ],
        },
    ],
})
