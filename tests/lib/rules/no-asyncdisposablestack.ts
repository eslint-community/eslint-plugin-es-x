import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-asyncdisposablestack"

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
