import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-promise-properties.ts"
import { promiseProperties } from "../../../lib/util/well-known-properties.ts"

new RuleTester().run("no-nonstandard-promise-properties", rule, {
    valid: [
        ...[...promiseProperties].map((p) => `Promise.${p}`),
        { code: "Promise.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Promise.unknown()",
            errors: ["Non-standard 'Promise.unknown' property is forbidden."],
        },
        {
            code: "Promise.foo",
            errors: ["Non-standard 'Promise.foo' property is forbidden."],
        },
        {
            code: "Promise.bar",
            errors: ["Non-standard 'Promise.bar' property is forbidden."],
        },
    ],
})
