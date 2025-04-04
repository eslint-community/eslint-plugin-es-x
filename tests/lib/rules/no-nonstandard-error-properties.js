"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-error-properties.js")
const { errorProperties } = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-error-properties", rule, {
    valid: [
        ...[...errorProperties].map((p) => `Error.${p}`),
        { code: "Error.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Error.unknown()",
            errors: ["Non-standard 'Error.unknown' property is forbidden."],
        },
        {
            code: "Error.foo",
            errors: ["Non-standard 'Error.foo' property is forbidden."],
        },
        {
            code: "Error.bar",
            errors: ["Non-standard 'Error.bar' property is forbidden."],
        },
    ],
})
