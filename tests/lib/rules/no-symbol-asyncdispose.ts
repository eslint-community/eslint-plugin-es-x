import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-symbol-asyncdispose.ts"

new RuleTester().run("no-symbol-asyncdispose", rule, {
    valid: ["Symbol", "Symbol.length", "let Symbol = 0; Symbol.asyncDispose"],
    invalid: [
        {
            code: "Symbol.asyncDispose",
            errors: ["ES2027 'Symbol.asyncDispose' property is forbidden."],
        },
    ],
})
