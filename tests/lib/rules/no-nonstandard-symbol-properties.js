"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-symbol-properties.js")
const { symbolProperties } = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-symbol-properties", rule, {
    valid: [
        ...[...symbolProperties].map((p) => `Symbol.${p}`),
        { code: "Symbol.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Symbol.unknown()",
            errors: ["Non-standard 'Symbol.unknown' property is forbidden."],
        },
        {
            code: "Symbol.foo",
            errors: ["Non-standard 'Symbol.foo' property is forbidden."],
        },
        {
            code: "Symbol.bar",
            errors: ["Non-standard 'Symbol.bar' property is forbidden."],
        },
    ],
})
