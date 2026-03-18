import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-dynamic-import-options"

new RuleTester({
    languageOptions: { sourceType: "module" },
}).run("no-dynamic-import-options", rule, {
    valid: ["import(source)"],
    invalid: [
        {
            code: "const module = await import(source, options)",
            errors: ["ES2025 the second parameter to 'import()' is forbidden."],
        },
    ],
})
