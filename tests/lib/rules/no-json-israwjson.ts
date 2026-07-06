import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-json-israwjson.ts"

new RuleTester().run("no-json-israwjson", rule, {
    valid: [
        "JSON",
        "JSON.parse",
        "let JSON = 0; JSON.isRawJSON",
        {
            code: "if (JSON.isRawJSON) JSON.isRawJSON(foo)",
            options: [{ allowTestedProperty: true }],
        },
    ],
    invalid: [
        {
            code: "JSON.isRawJSON",
            errors: ["ES2026 'JSON.isRawJSON' method is forbidden."],
        },
        {
            code: "if (JSON.isRawJSON) JSON.isRawJSON(foo)",
            errors: 2,
        },
        {
            code: "JSON.isRawJSON(foo)",
            options: [{ allowTestedProperty: true }],
            errors: ["ES2026 'JSON.isRawJSON' method is forbidden."],
        },
    ],
})
