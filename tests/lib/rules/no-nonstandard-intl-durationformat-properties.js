"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-intl-durationformat-properties.js")
const {
    intlDurationFormatProperties,
} = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-intl-durationformat-properties", rule, {
    valid: [
        ...[...intlDurationFormatProperties].map(
            (p) => `Intl.DurationFormat.${p}`,
        ),
        {
            code: "Intl.DurationFormat.unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "Intl.DurationFormat.unknown()",
            errors: [
                "Non-standard 'Intl.DurationFormat.unknown' property is forbidden.",
            ],
        },
        {
            code: "Intl.DurationFormat.foo",
            errors: [
                "Non-standard 'Intl.DurationFormat.foo' property is forbidden.",
            ],
        },
        {
            code: "Intl.DurationFormat.bar",
            errors: [
                "Non-standard 'Intl.DurationFormat.bar' property is forbidden.",
            ],
        },
    ],
})
