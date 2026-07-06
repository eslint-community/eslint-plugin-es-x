import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-temporal-zoneddatetime-properties.ts"
import { temporalZonedDateTimeProperties } from "../../../lib/util/well-known-properties.ts"

new RuleTester().run("no-nonstandard-temporal-zoneddatetime-properties", rule, {
    valid: [
        ...[...temporalZonedDateTimeProperties].map(
            (p) => `Temporal.ZonedDateTime.${p}`,
        ),
        {
            code: "Temporal.ZonedDateTime.unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "Temporal.ZonedDateTime.unknown()",
            errors: [
                "Non-standard 'Temporal.ZonedDateTime.unknown' property is forbidden.",
            ],
        },
        {
            code: "Temporal.ZonedDateTime.foo",
            errors: [
                "Non-standard 'Temporal.ZonedDateTime.foo' property is forbidden.",
            ],
        },
    ],
})
