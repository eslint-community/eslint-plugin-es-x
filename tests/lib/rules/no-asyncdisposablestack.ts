import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-asyncdisposablestack.ts"

new RuleTester().run("no-asyncdisposablestack", rule, {
    valid: [
        "Array",
        "Object",
        "let AsyncDisposableStack = 0; AsyncDisposableStack",
    ],
    invalid: [
        {
            code: "AsyncDisposableStack",
            errors: ["ES2027 'AsyncDisposableStack' class is forbidden."],
        },
        {
            code: "function f() { AsyncDisposableStack }",
            errors: ["ES2027 'AsyncDisposableStack' class is forbidden."],
        },
    ],
})
