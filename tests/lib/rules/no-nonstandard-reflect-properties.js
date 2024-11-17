"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-reflect-properties.js")
const { reflectProperties } = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-reflect-properties", rule, {
    valid: [
        ...[...reflectProperties].map((p) => `Reflect.${p}`),
        { code: "Reflect.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Reflect.unknown()",
            errors: ["Non-standard 'Reflect.unknown' property is forbidden."],
        },
        {
            code: "Reflect.foo",
            errors: ["Non-standard 'Reflect.foo' property is forbidden."],
        },
        {
            code: "Reflect.bar",
            errors: ["Non-standard 'Reflect.bar' property is forbidden."],
        },
    ],
})
