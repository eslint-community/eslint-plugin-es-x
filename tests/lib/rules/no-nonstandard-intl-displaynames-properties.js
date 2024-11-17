"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-intl-displaynames-properties.js")
const {
    intlDisplayNamesProperties,
} = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-intl-displaynames-properties", rule, {
    valid: [
        ...[...intlDisplayNamesProperties].map((p) => `Intl.DisplayNames.${p}`),
        {
            code: "Intl.DisplayNames.unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "Intl.DisplayNames.unknown()",
            errors: [
                "Non-standard 'Intl.DisplayNames.unknown' property is forbidden.",
            ],
        },
        {
            code: "Intl.DisplayNames.foo",
            errors: [
                "Non-standard 'Intl.DisplayNames.foo' property is forbidden.",
            ],
        },
        {
            code: "Intl.DisplayNames.bar",
            errors: [
                "Non-standard 'Intl.DisplayNames.bar' property is forbidden.",
            ],
        },
    ],
})
