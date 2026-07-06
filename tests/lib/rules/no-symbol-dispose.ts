import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-symbol-dispose.ts"

new RuleTester().run("no-symbol-dispose", rule, {
    valid: ["Symbol", "Symbol.length", "let Symbol = 0; Symbol.dispose"],
    invalid: [
        {
            code: "Symbol.dispose",
            errors: ["ES2027 'Symbol.dispose' property is forbidden."],
        },
    ],
})
