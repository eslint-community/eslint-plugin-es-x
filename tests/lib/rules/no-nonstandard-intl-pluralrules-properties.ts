import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-intl-pluralrules-properties.ts"
import { intlPluralRulesProperties } from "../../../lib/util/well-known-properties.ts"

new RuleTester().run("no-nonstandard-intl-pluralrules-properties", rule, {
    valid: [
        ...[...intlPluralRulesProperties].map((p) => `Intl.PluralRules.${p}`),
        {
            code: "Intl.PluralRules.unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "Intl.PluralRules.unknown()",
            errors: [
                "Non-standard 'Intl.PluralRules.unknown' property is forbidden.",
            ],
        },
        {
            code: "Intl.PluralRules.foo",
            errors: [
                "Non-standard 'Intl.PluralRules.foo' property is forbidden.",
            ],
        },
        {
            code: "Intl.PluralRules.bar",
            errors: [
                "Non-standard 'Intl.PluralRules.bar' property is forbidden.",
            ],
        },
    ],
})
