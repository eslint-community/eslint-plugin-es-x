"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-function-properties.js")
const {
    functionProperties,
} = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-function-properties", rule, {
    valid: [
        ...[...functionProperties].map((p) => `Function.${p}`),
        { code: "Function.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Function.unknown()",
            errors: ["Non-standard 'Function.unknown' property is forbidden."],
        },
        {
            code: "Function.foo",
            errors: ["Non-standard 'Function.foo' property is forbidden."],
        },
        {
            code: "Function.bar",
            errors: ["Non-standard 'Function.bar' property is forbidden."],
        },
    ],
})
