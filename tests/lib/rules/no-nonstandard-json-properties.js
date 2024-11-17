"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-json-properties.js")
const { jsonProperties } = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-json-properties", rule, {
    valid: [
        ...[...jsonProperties].map((p) => `JSON.${p}`),
        { code: "JSON.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "JSON.unknown()",
            errors: ["Non-standard 'JSON.unknown' property is forbidden."],
        },
        {
            code: "JSON.foo",
            errors: ["Non-standard 'JSON.foo' property is forbidden."],
        },
        {
            code: "JSON.bar",
            errors: ["Non-standard 'JSON.bar' property is forbidden."],
        },
    ],
})
