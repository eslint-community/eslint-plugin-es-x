"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-intl-pluralrules-properties.js")
const {
    intlPluralRulesProperties,
} = require("../../../lib/util/well-known-properties")

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
