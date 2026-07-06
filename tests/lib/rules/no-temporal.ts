import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-temporal.ts"

new RuleTester().run("no-temporal", rule, {
    valid: ["Array", "Object", "let Temporal = 0; Temporal"],
    invalid: [
        {
            code: "Temporal",
            errors: ["ES2027 'Temporal' global object is forbidden."],
        },
        {
            code: "function f() { Temporal }",
            errors: ["ES2027 'Temporal' global object is forbidden."],
        },
    ],
})
