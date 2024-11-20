"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-weakmap-properties.js")
const { weakMapProperties } = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-weakmap-properties", rule, {
    valid: [
        ...[...weakMapProperties].map((p) => `WeakMap.${p}`),
        { code: "WeakMap.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "WeakMap.unknown()",
            errors: ["Non-standard 'WeakMap.unknown' property is forbidden."],
        },
        {
            code: "WeakMap.foo",
            errors: ["Non-standard 'WeakMap.foo' property is forbidden."],
        },
        {
            code: "WeakMap.bar",
            errors: ["Non-standard 'WeakMap.bar' property is forbidden."],
        },
    ],
})
