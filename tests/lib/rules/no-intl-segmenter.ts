import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-intl-segmenter"

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
