"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-intl-collator-properties.js")
const {
    intlCollatorProperties,
} = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-intl-collator-properties", rule, {
    valid: [
        ...[...intlCollatorProperties].map((p) => `Intl.Collator.${p}`),
        { code: "Intl.Collator.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Intl.Collator.unknown()",
            errors: [
                "Non-standard 'Intl.Collator.unknown' property is forbidden.",
            ],
        },
        {
            code: "Intl.Collator.foo",
            errors: ["Non-standard 'Intl.Collator.foo' property is forbidden."],
        },
        {
            code: "Intl.Collator.bar",
            errors: ["Non-standard 'Intl.Collator.bar' property is forbidden."],
        },
    ],
})
