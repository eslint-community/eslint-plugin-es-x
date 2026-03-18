"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-set-properties.js")
const { setProperties } = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-set-properties", rule, {
    valid: [
        ...[...setProperties].map((p) => `Set.${p}`),
        { code: "Set.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Set.unknown()",
            errors: ["Non-standard 'Set.unknown' property is forbidden."],
        },
        {
            code: "Set.foo",
            errors: ["Non-standard 'Set.foo' property is forbidden."],
        },
        {
            code: "Set.bar",
            errors: ["Non-standard 'Set.bar' property is forbidden."],
        },
    ],
})
