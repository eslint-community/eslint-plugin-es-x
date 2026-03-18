import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-symbol-dispose"

new RuleTester().run("no-symbol-dispose", rule, {
    valid: ["Symbol", "Symbol.length", "let Symbol = 0; Symbol.dispose"],
    invalid: [
        {
            code: "Symbol.dispose",
            errors: ["ES2026 'Symbol.dispose' property is forbidden."],
        },
    ],
})
