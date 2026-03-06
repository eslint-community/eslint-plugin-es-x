"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-temporal-now-properties.js")
const {
    temporalNowProperties,
} = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-temporal-now-properties", rule, {
    valid: [
        ...[...temporalNowProperties].map((p) => `Temporal.Now.${p}`),
        { code: "Temporal.Now.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Temporal.Now.unknown()",
            errors: [
                "Non-standard 'Temporal.Now.unknown' property is forbidden.",
            ],
        },
        {
            code: "Temporal.Now.foo",
            errors: ["Non-standard 'Temporal.Now.foo' property is forbidden."],
        },
    ],
})
