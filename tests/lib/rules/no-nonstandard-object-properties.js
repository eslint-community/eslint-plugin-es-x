"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-object-properties.js")
const { objectProperties } = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-object-properties", rule, {
    valid: [
        ...[...objectProperties].map((p) => `Object.${p}`),
        { code: "Object.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Object.unknown()",
            errors: ["Non-standard 'Object.unknown' property is forbidden."],
        },
        {
            code: "Object.foo",
            errors: ["Non-standard 'Object.foo' property is forbidden."],
        },
        {
            code: "Object.bar",
            errors: ["Non-standard 'Object.bar' property is forbidden."],
        },
    ],
})
