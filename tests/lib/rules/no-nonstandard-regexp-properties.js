"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-regexp-properties.js")
const { regexpProperties } = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-regexp-properties", rule, {
    valid: [
        ...[...regexpProperties].map((p) => `RegExp[${JSON.stringify(p)}]`),
        { code: "RegExp.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "RegExp.unknown()",
            errors: ["Non-standard 'RegExp.unknown' property is forbidden."],
        },
        {
            code: "RegExp.foo",
            errors: ["Non-standard 'RegExp.foo' property is forbidden."],
        },
        {
            code: "RegExp.bar",
            errors: ["Non-standard 'RegExp.bar' property is forbidden."],
        },
    ],
})
