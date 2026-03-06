"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-temporal-properties.js")
const {
    temporalProperties,
} = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-temporal-properties", rule, {
    valid: [
        ...[...temporalProperties].map((p) => `Temporal.${p}`),
        { code: "Temporal.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Temporal.unknown()",
            errors: ["Non-standard 'Temporal.unknown' property is forbidden."],
        },
        {
            code: "Temporal.foo",
            errors: ["Non-standard 'Temporal.foo' property is forbidden."],
        },
    ],
})
