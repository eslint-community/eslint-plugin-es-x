import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-disposablestack.ts"

new RuleTester().run("no-disposablestack", rule, {
    valid: ["Array", "Object", "let DisposableStack = 0; DisposableStack"],
    invalid: [
        {
            code: "DisposableStack",
            errors: ["ES2027 'DisposableStack' class is forbidden."],
        },
        {
            code: "function f() { DisposableStack }",
            errors: ["ES2027 'DisposableStack' class is forbidden."],
        },
    ],
})
