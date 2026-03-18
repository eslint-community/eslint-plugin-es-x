"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-intl-segmenter-properties.js")
const {
    intlSegmenterProperties,
} = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-intl-segmenter-properties", rule, {
    valid: [
        ...[...intlSegmenterProperties].map((p) => `Intl.Segmenter.${p}`),
        { code: "Intl.Segmenter.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Intl.Segmenter.unknown()",
            errors: [
                "Non-standard 'Intl.Segmenter.unknown' property is forbidden.",
            ],
        },
        {
            code: "Intl.Segmenter.foo",
            errors: [
                "Non-standard 'Intl.Segmenter.foo' property is forbidden.",
            ],
        },
        {
            code: "Intl.Segmenter.bar",
            errors: [
                "Non-standard 'Intl.Segmenter.bar' property is forbidden.",
            ],
        },
    ],
})
