import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-temporal-plaindate-properties.ts"
import { temporalPlainDateProperties } from "../../../lib/util/well-known-properties.ts"

new RuleTester().run("no-nonstandard-temporal-plaindate-properties", rule, {
    valid: [
        ...[...temporalPlainDateProperties].map(
            (p) => `Temporal.PlainDate.${p}`,
        ),
        {
            code: "Temporal.PlainDate.unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "Temporal.PlainDate.unknown()",
            errors: [
                "Non-standard 'Temporal.PlainDate.unknown' property is forbidden.",
            ],
        },
        {
            code: "Temporal.PlainDate.foo",
            errors: [
                "Non-standard 'Temporal.PlainDate.foo' property is forbidden.",
            ],
        },
    ],
})
