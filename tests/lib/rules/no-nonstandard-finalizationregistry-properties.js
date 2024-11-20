"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-finalizationregistry-properties.js")
const {
    finalizationRegistryProperties,
} = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-finalizationregistry-properties", rule, {
    valid: [
        ...[...finalizationRegistryProperties].map(
            (p) => `FinalizationRegistry.${p}`,
        ),
        {
            code: "FinalizationRegistry.unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "FinalizationRegistry.unknown()",
            errors: [
                "Non-standard 'FinalizationRegistry.unknown' property is forbidden.",
            ],
        },
        {
            code: "FinalizationRegistry.foo",
            errors: [
                "Non-standard 'FinalizationRegistry.foo' property is forbidden.",
            ],
        },
        {
            code: "FinalizationRegistry.bar",
            errors: [
                "Non-standard 'FinalizationRegistry.bar' property is forbidden.",
            ],
        },
    ],
})
