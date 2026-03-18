import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-iterator"

new RuleTester({
    languageOptions: { globals: { Iterator: "readonly" } },
}).run("no-iterator", rule, {
    valid: [
        "Array.from(object)",
        "const Iterator = Array; Iterator.from(object)",
    ],
    invalid: [
        {
            code: "Iterator.from(object)",
            errors: ["ES2025 'Iterator' class is forbidden."],
        },
        {
            code: "Iterator",
            errors: ["ES2025 'Iterator' class is forbidden."],
        },
    ],
})
