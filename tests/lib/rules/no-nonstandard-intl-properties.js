"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-intl-properties.js")
const { intlProperties } = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-intl-properties", rule, {
    valid: [
        ...[...intlProperties].map((p) => `Intl.${p}`),
        { code: "Intl.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Intl.unknown()",
            errors: ["Non-standard 'Intl.unknown' property is forbidden."],
        },
        {
            code: "Intl.foo",
            errors: ["Non-standard 'Intl.foo' property is forbidden."],
        },
        {
            code: "Intl.bar",
            errors: ["Non-standard 'Intl.bar' property is forbidden."],
        },
    ],
})
