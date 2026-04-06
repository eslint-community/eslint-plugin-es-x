import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-disposablestack"

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
