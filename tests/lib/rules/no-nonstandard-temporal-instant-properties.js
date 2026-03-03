"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-temporal-instant-properties.js")
const {
    temporalInstantProperties,
} = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-temporal-instant-properties", rule, {
    valid: [
        ...[...temporalInstantProperties].map((p) => `Temporal.Instant.${p}`),
        {
            code: "Temporal.Instant.unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "Temporal.Instant.unknown()",
            errors: [
                "Non-standard 'Temporal.Instant.unknown' property is forbidden.",
            ],
        },
        {
            code: "Temporal.Instant.foo",
            errors: [
                "Non-standard 'Temporal.Instant.foo' property is forbidden.",
            ],
        },
    ],
})
