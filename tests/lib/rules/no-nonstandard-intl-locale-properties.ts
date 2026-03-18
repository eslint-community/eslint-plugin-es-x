import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-nonstandard-intl-locale-properties"
import { intlLocaleProperties } from "../../../lib/util/well-known-properties"

new RuleTester().run("no-nonstandard-intl-locale-properties", rule, {
    valid: [
        ...[...intlLocaleProperties].map((p) => `Intl.Locale.${p}`),
        { code: "Intl.Locale.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Intl.Locale.unknown()",
            errors: [
                "Non-standard 'Intl.Locale.unknown' property is forbidden.",
            ],
        },
        {
            code: "Intl.Locale.foo",
            errors: ["Non-standard 'Intl.Locale.foo' property is forbidden."],
        },
        {
            code: "Intl.Locale.bar",
            errors: ["Non-standard 'Intl.Locale.bar' property is forbidden."],
        },
    ],
})
