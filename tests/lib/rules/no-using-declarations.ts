import * as parser from "@typescript-eslint/parser"
import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-using-declarations"

new RuleTester({
    languageOptions: {
        sourceType: "module",
        parser, // espree does not support `using` yet.
    },
}).run("no-using-declarations", rule, {
    valid: ["let x = y", "const x = y", "var x = y", "const x = await y"],
    invalid: [
        {
            code: "using x = y",
            errors: ["ES2026 'using' declarations are forbidden."],
        },
        {
            code: "await using x = y",
            errors: ["ES2026 'await using' declarations are forbidden."],
        },
    ],
})
