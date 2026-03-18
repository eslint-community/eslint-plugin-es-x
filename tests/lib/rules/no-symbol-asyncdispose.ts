import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-symbol-asyncdispose"

new RuleTester().run("no-symbol-asyncdispose", rule, {
    valid: ["Symbol", "Symbol.length", "let Symbol = 0; Symbol.asyncDispose"],
    invalid: [
        {
            code: "Symbol.asyncDispose",
            errors: ["ES2026 'Symbol.asyncDispose' property is forbidden."],
        },
    ],
})
