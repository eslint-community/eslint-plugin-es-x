"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-date-properties.js")
const { dateProperties } = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-date-properties", rule, {
    valid: [
        ...[...dateProperties].map((p) => `Date.${p}`),
        { code: "Date.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Date.unknown()",
            errors: ["Non-standard 'Date.unknown' property is forbidden."],
        },
        {
            code: "Date.foo",
            errors: ["Non-standard 'Date.foo' property is forbidden."],
        },
        {
            code: "Date.bar",
            errors: ["Non-standard 'Date.bar' property is forbidden."],
        },
    ],
})
