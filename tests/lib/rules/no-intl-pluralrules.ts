import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-intl-pluralrules.ts"

new RuleTester().run("no-intl-pluralrules", rule, {
    valid: [
        "Intl",
        "Intl.DateTimeFormat",
        "Intl.NumberFormat",
        "let Intl = 0; Intl.PluralRules",
    ],
    invalid: [
        {
            code: "Intl.PluralRules",
            errors: ["ES2018 Intl API 'Intl.PluralRules' object is forbidden."],
        },
    ],
})
