import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-nonstandard-temporal-plaintime-properties"
import { temporalPlainTimeProperties } from "../../../lib/util/well-known-properties"

new RuleTester().run("no-nonstandard-temporal-plaintime-properties", rule, {
    valid: [
        ...[...temporalPlainTimeProperties].map(
            (p) => `Temporal.PlainTime.${p}`,
        ),
        {
            code: "Temporal.PlainTime.unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "Temporal.PlainTime.unknown()",
            errors: [
                "Non-standard 'Temporal.PlainTime.unknown' property is forbidden.",
            ],
        },
        {
            code: "Temporal.PlainTime.foo",
            errors: [
                "Non-standard 'Temporal.PlainTime.foo' property is forbidden.",
            ],
        },
    ],
})
