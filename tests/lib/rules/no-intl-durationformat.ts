import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-intl-durationformat"

new RuleTester().run("no-intl-durationformat", rule, {
    valid: [
        "Intl",
        "Intl.DateTimeFormat",
        "Intl.NumberFormat",
        "let Intl = 0; Intl.DurationFormat",
    ],
    invalid: [
        {
            code: "Intl.DurationFormat",
            errors: [
                "ES2025 Intl API 'Intl.DurationFormat' object is forbidden.",
            ],
        },
    ],
})
