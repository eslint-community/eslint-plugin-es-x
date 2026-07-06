import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-intl-relativetimeformat-properties.ts"
import { intlRelativeTimeFormatProperties } from "../../../lib/util/well-known-properties.ts"

new RuleTester().run(
    "no-nonstandard-intl-relativetimeformat-properties",
    rule,
    {
        valid: [
            ...[...intlRelativeTimeFormatProperties].map(
                (p) => `Intl.RelativeTimeFormat.${p}`,
            ),
            {
                code: "Intl.RelativeTimeFormat.unknown()",
                options: [{ allow: ["unknown"] }],
            },
        ],
        invalid: [
            {
                code: "Intl.RelativeTimeFormat.unknown()",
                errors: [
                    "Non-standard 'Intl.RelativeTimeFormat.unknown' property is forbidden.",
                ],
            },
            {
                code: "Intl.RelativeTimeFormat.foo",
                errors: [
                    "Non-standard 'Intl.RelativeTimeFormat.foo' property is forbidden.",
                ],
            },
            {
                code: "Intl.RelativeTimeFormat.bar",
                errors: [
                    "Non-standard 'Intl.RelativeTimeFormat.bar' property is forbidden.",
                ],
            },
        ],
    },
)
