import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-iterator-zip"

new RuleTester().run("no-iterator-zip", rule, {
    valid: [
        "Iterator",
        "Iterator.length",
        "Iterator.zipKeyed",
        "let Iterator = 0; Iterator.zip",
    ],
    invalid: [
        {
            code: "Iterator.zip",
            errors: ["ES2027 'Iterator.zip' method is forbidden."],
        },
    ],
})
