import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-suppressederror.ts"

new RuleTester().run("no-suppressederror", rule, {
    valid: ["Array", "Object", "let SuppressedError = 0; SuppressedError"],
    invalid: [
        {
            code: "SuppressedError",
            errors: ["ES2027 'SuppressedError' class is forbidden."],
        },
        {
            code: "function f() { SuppressedError }",
            errors: ["ES2027 'SuppressedError' class is forbidden."],
        },
    ],
})
