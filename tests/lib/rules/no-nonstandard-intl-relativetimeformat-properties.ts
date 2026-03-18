import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-nonstandard-intl-relativetimeformat-properties"
import { intlRelativeTimeFormatProperties } from "../../../lib/util/well-known-properties"

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
