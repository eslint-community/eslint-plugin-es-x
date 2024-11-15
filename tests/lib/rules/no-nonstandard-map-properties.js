"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-map-properties.js")
const { mapProperties } = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-map-properties", rule, {
    valid: [
        ...[...mapProperties].map((p) => `Map.${p}`),
        { code: "Map.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Map.unknown()",
            errors: ["Non-standard 'Map.unknown' property is forbidden."],
        },
        {
            code: "Map.foo",
            errors: ["Non-standard 'Map.foo' property is forbidden."],
        },
        {
            code: "Map.bar",
            errors: ["Non-standard 'Map.bar' property is forbidden."],
        },
    ],
})
