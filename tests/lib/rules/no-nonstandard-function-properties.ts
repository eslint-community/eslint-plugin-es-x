import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-function-properties.ts"
import { functionProperties } from "../../../lib/util/well-known-properties.ts"

new RuleTester().run("no-nonstandard-function-properties", rule, {
    valid: [
        ...[...functionProperties].map((p) => `Function.${p}`),
        { code: "Function.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Function.unknown()",
            errors: ["Non-standard 'Function.unknown' property is forbidden."],
        },
        {
            code: "Function.foo",
            errors: ["Non-standard 'Function.foo' property is forbidden."],
        },
        {
            code: "Function.bar",
            errors: ["Non-standard 'Function.bar' property is forbidden."],
        },
    ],
})
