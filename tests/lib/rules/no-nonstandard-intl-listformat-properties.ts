import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-nonstandard-intl-listformat-properties"
import { intlListFormatProperties } from "../../../lib/util/well-known-properties"

new RuleTester().run("no-nonstandard-intl-listformat-properties", rule, {
    valid: [
        ...[...intlListFormatProperties].map((p) => `Intl.ListFormat.${p}`),
        {
            code: "Intl.ListFormat.unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "Intl.ListFormat.unknown()",
            errors: [
                "Non-standard 'Intl.ListFormat.unknown' property is forbidden.",
            ],
        },
        {
            code: "Intl.ListFormat.foo",
            errors: [
                "Non-standard 'Intl.ListFormat.foo' property is forbidden.",
            ],
        },
        {
            code: "Intl.ListFormat.bar",
            errors: [
                "Non-standard 'Intl.ListFormat.bar' property is forbidden.",
            ],
        },
    ],
})
