"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-intl-datetimeformat-properties.js")
const {
    intlDateTimeFormatProperties,
} = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-intl-datetimeformat-properties", rule, {
    valid: [
        ...[...intlDateTimeFormatProperties].map(
            (p) => `Intl.DateTimeFormat.${p}`,
        ),
        {
            code: "Intl.DateTimeFormat.unknown()",
            options: [{ allow: ["unknown"] }],
        },
        {
            code: `
            if (Intl.DateTimeFormat.unknown) {
                console.log(Intl.DateTimeFormat.unknown())
            }`,
            options: [{ allowTestedProperty: true }],
        },
    ],
    invalid: [
        {
            code: "Intl.DateTimeFormat.unknown()",
            errors: [
                "Non-standard 'Intl.DateTimeFormat.unknown' property is forbidden.",
            ],
        },
        {
            code: "Intl.DateTimeFormat.foo",
            errors: [
                "Non-standard 'Intl.DateTimeFormat.foo' property is forbidden.",
            ],
        },
        {
            code: "Intl.DateTimeFormat.bar",
            errors: [
                "Non-standard 'Intl.DateTimeFormat.bar' property is forbidden.",
            ],
        },
        {
            code: `
            if (Intl.DateTimeFormat.unknown) {
                console.log(Intl.DateTimeFormat.unknown())
            }`,
            errors: 2,
        },
    ],
})
