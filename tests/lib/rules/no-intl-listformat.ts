import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-intl-listformat"

new RuleTester().run("no-intl-listformat", rule, {
    valid: [
        "Intl",
        "Intl.DateTimeFormat",
        "Intl.NumberFormat",
        "let Intl = 0; Intl.ListFormat",
    ],
    invalid: [
        {
            code: "Intl.ListFormat",
            errors: ["ES2021 Intl API 'Intl.ListFormat' object is forbidden."],
        },
    ],
})
