"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-temporal-plainyearmonth-properties.js")
const {
    temporalPlainYearMonthProperties,
} = require("../../../lib/util/well-known-properties")

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
