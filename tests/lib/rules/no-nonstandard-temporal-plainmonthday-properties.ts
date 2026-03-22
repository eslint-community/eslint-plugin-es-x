import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-nonstandard-temporal-plainmonthday-properties"
import { temporalPlainMonthDayProperties } from "../../../lib/util/well-known-properties"

new RuleTester().run("no-nonstandard-temporal-plainmonthday-properties", rule, {
    valid: [
        ...[...temporalPlainMonthDayProperties].map(
            (p) => `Temporal.PlainMonthDay.${p}`,
        ),
        {
            code: "Temporal.PlainMonthDay.unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "Temporal.PlainMonthDay.unknown()",
            errors: [
                "Non-standard 'Temporal.PlainMonthDay.unknown' property is forbidden.",
            ],
        },
        {
            code: "Temporal.PlainMonthDay.foo",
            errors: [
                "Non-standard 'Temporal.PlainMonthDay.foo' property is forbidden.",
            ],
        },
    ],
})
