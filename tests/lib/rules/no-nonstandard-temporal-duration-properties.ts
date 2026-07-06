import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-temporal-duration-properties.ts"
import { temporalDurationProperties } from "../../../lib/util/well-known-properties.ts"

new RuleTester().run("no-nonstandard-temporal-duration-properties", rule, {
    valid: [
        ...[...temporalDurationProperties].map((p) => `Temporal.Duration.${p}`),
        {
            code: "Temporal.Duration.unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "Temporal.Duration.unknown()",
            errors: [
                "Non-standard 'Temporal.Duration.unknown' property is forbidden.",
            ],
        },
        {
            code: "Temporal.Duration.foo",
            errors: [
                "Non-standard 'Temporal.Duration.foo' property is forbidden.",
            ],
        },
    ],
})
