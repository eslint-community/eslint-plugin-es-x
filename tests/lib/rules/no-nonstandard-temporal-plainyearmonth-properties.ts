import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-temporal-plainyearmonth-properties.ts"
import { temporalPlainYearMonthProperties } from "../../../lib/util/well-known-properties.ts"

new RuleTester().run(
    "no-nonstandard-temporal-plainyearmonth-properties",
    rule,
    {
        valid: [
            ...[...temporalPlainYearMonthProperties].map(
                (p) => `Temporal.PlainYearMonth.${p}`,
            ),
            {
                code: "Temporal.PlainYearMonth.unknown()",
                options: [{ allow: ["unknown"] }],
            },
        ],
        invalid: [
            {
                code: "Temporal.PlainYearMonth.unknown()",
                errors: [
                    "Non-standard 'Temporal.PlainYearMonth.unknown' property is forbidden.",
                ],
            },
            {
                code: "Temporal.PlainYearMonth.foo",
                errors: [
                    "Non-standard 'Temporal.PlainYearMonth.foo' property is forbidden.",
                ],
            },
        ],
    },
)
