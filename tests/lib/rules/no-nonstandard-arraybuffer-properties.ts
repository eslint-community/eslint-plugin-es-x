"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-arraybuffer-properties.js")
const {
    arrayBufferProperties,
} = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-arraybuffer-properties", rule, {
    valid: [
        ...[...arrayBufferProperties].map((p) => `ArrayBuffer.${p}`),
        { code: "ArrayBuffer.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "ArrayBuffer.unknown()",
            errors: [
                "Non-standard 'ArrayBuffer.unknown' property is forbidden.",
            ],
        },
        {
            code: "ArrayBuffer.foo",
            errors: ["Non-standard 'ArrayBuffer.foo' property is forbidden."],
        },
        {
            code: "ArrayBuffer.bar",
            errors: ["Non-standard 'ArrayBuffer.bar' property is forbidden."],
        },
    ],
})
