import RuleTester from "../../tester"
import rule from "../../../lib/rules/no-symbol-matchall"

new RuleTester().run("no-symbol-matchall", rule, {
    valid: ["Symbol", "Symbol.length", "let Symbol = 0; Symbol.matchAll"],
    invalid: [
        {
            code: "Symbol.matchAll",
            errors: ["ES2020 'Symbol.matchAll' property is forbidden."],
        },
    ],
})
