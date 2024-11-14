"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-number-properties.js")
const { numberProperties } = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-number-properties", rule, {
    valid: [
        ...[...numberProperties].map((p) => `Number.${p}`),
        { code: "Number.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Number.unknown()",
            errors: ["Non-standard 'Number.unknown' property is forbidden."],
        },
        {
            code: "Number.foo",
            errors: ["Non-standard 'Number.foo' property is forbidden."],
        },
        {
            code: "Number.bar",
            errors: ["Non-standard 'Number.bar' property is forbidden."],
        },
    ],
})
