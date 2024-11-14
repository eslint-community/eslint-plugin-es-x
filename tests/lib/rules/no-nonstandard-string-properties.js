"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-string-properties.js")
const { stringProperties } = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-string-properties", rule, {
    valid: [
        ...[...stringProperties].map((p) => `String.${p}`),
        { code: "String.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "String.unknown()",
            errors: ["Non-standard 'String.unknown' property is forbidden."],
        },
        {
            code: "String.foo",
            errors: ["Non-standard 'String.foo' property is forbidden."],
        },
        {
            code: "String.bar",
            errors: ["Non-standard 'String.bar' property is forbidden."],
        },
    ],
})
