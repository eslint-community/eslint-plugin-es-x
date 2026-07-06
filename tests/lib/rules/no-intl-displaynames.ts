import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-intl-displaynames.ts"

new RuleTester().run("no-intl-displaynames", rule, {
    valid: [
        "Intl",
        "Intl.DateTimeFormat",
        "Intl.NumberFormat",
        "let Intl = 0; Intl.DisplayNames",
    ],
    invalid: [
        {
            code: "Intl.DisplayNames",
            errors: [
                "ES2021 Intl API 'Intl.DisplayNames' object is forbidden.",
            ],
        },
    ],
})
