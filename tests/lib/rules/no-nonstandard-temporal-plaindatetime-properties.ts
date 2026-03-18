import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-nonstandard-temporal-plaindatetime-properties"
import { temporalPlainDateTimeProperties } from "../../../lib/util/well-known-properties"

new RuleTester().run("no-nonstandard-temporal-plaindatetime-properties", rule, {
    valid: [
        ...[...temporalPlainDateTimeProperties].map(
            (p) => `Temporal.PlainDateTime.${p}`,
        ),
        {
            code: "Temporal.PlainDateTime.unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "Temporal.PlainDateTime.unknown()",
            errors: [
                "Non-standard 'Temporal.PlainDateTime.unknown' property is forbidden.",
            ],
        },
        {
            code: "Temporal.PlainDateTime.foo",
            errors: [
                "Non-standard 'Temporal.PlainDateTime.foo' property is forbidden.",
            ],
        },
    ],
})
