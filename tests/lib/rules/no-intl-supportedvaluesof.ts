import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-intl-supportedvaluesof.ts"

new RuleTester().run("no-intl-supportedvaluesof", rule, {
    valid: [
        "Intl",
        "Intl.DateTimeFormat",
        "Intl.NumberFormat",
        "let Intl = 0; Intl.supportedValuesOf",
    ],
    invalid: [
        {
            code: "Intl.supportedValuesOf",
            errors: [
                "ES2022 Intl API 'Intl.supportedValuesOf' method is forbidden.",
            ],
        },
    ],
})
