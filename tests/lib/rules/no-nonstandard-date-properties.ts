import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-date-properties.ts"
import { dateProperties } from "../../../lib/util/well-known-properties.ts"

new RuleTester().run("no-nonstandard-date-properties", rule, {
    valid: [
        ...[...dateProperties].map((p) => `Date.${p}`),
        { code: "Date.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Date.unknown()",
            errors: ["Non-standard 'Date.unknown' property is forbidden."],
        },
        {
            code: "Date.foo",
            errors: ["Non-standard 'Date.foo' property is forbidden."],
        },
        {
            code: "Date.bar",
            errors: ["Non-standard 'Date.bar' property is forbidden."],
        },
    ],
})
