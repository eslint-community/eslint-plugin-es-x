"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-iterator-properties.js")
const {
    iteratorProperties,
} = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-iterator-properties", rule, {
    valid: [
        ...[...iteratorProperties].map((p) => `Iterator.${p}`),
        { code: "Iterator.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Iterator.unknown()",
            errors: ["Non-standard 'Iterator.unknown' property is forbidden."],
        },
        {
            code: "Iterator.foo",
            errors: ["Non-standard 'Iterator.foo' property is forbidden."],
        },
        {
            code: "Iterator.bar",
            errors: ["Non-standard 'Iterator.bar' property is forbidden."],
        },
    ],
})
