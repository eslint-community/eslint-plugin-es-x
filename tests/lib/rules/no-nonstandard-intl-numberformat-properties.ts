import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-intl-numberformat-properties.ts"
import { intlNumberFormatProperties } from "../../../lib/util/well-known-properties.ts"

new RuleTester().run("no-nonstandard-intl-numberformat-properties", rule, {
    valid: [
        ...[...intlNumberFormatProperties].map((p) => `Intl.NumberFormat.${p}`),
        {
            code: "Intl.NumberFormat.unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "Intl.NumberFormat.unknown()",
            errors: [
                "Non-standard 'Intl.NumberFormat.unknown' property is forbidden.",
            ],
        },
        {
            code: "Intl.NumberFormat.foo",
            errors: [
                "Non-standard 'Intl.NumberFormat.foo' property is forbidden.",
            ],
        },
        {
            code: "Intl.NumberFormat.bar",
            errors: [
                "Non-standard 'Intl.NumberFormat.bar' property is forbidden.",
            ],
        },
    ],
})
