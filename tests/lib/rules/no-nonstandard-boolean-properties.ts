"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-boolean-properties.js")
const { booleanProperties } = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-boolean-properties", rule, {
    valid: [
        ...[...booleanProperties].map((p) => `Boolean.${p}`),
        { code: "Boolean.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Boolean.unknown()",
            errors: ["Non-standard 'Boolean.unknown' property is forbidden."],
        },
        {
            code: "Boolean.foo",
            errors: ["Non-standard 'Boolean.foo' property is forbidden."],
        },
        {
            code: "Boolean.bar",
            errors: ["Non-standard 'Boolean.bar' property is forbidden."],
        },
    ],
})
