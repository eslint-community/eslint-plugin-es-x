"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-array-properties.js")
const { arrayProperties } = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-array-properties", rule, {
    valid: [
        ...[...arrayProperties].map((p) => `Array.${p}`),
        { code: "Array.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Array.unknown()",
            errors: ["Non-standard 'Array.unknown' property is forbidden."],
        },
        {
            code: "Array.foo",
            errors: ["Non-standard 'Array.foo' property is forbidden."],
        },
        {
            code: "Array.bar",
            errors: ["Non-standard 'Array.bar' property is forbidden."],
        },
        {
            code: "const { foo } = Array;",
            errors: ["Non-standard 'Array.foo' property is forbidden."],
        },
        {
            code: ";({ foo } = Array);",
            errors: ["Non-standard 'Array.foo' property is forbidden."],
        },
        {
            code: "const { a: {foo}=Array } = {};",
            errors: ["Non-standard 'Array.foo' property is forbidden."],
        },
    ],
})
