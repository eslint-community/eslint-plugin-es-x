import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-iterator-zipkeyed.ts"

new RuleTester().run("no-iterator-zipkeyed", rule, {
    valid: [
        "Iterator",
        "Iterator.length",
        "Iterator.zip",
        "let Iterator = 0; Iterator.zipKeyed",
    ],
    invalid: [
        {
            code: "Iterator.zipKeyed",
            errors: ["ES2027 'Iterator.zipKeyed' method is forbidden."],
        },
    ],
})
