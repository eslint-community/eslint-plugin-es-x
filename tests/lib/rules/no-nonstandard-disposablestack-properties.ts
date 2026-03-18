"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-disposablestack-properties.js")
const {
    disposableStackProperties,
} = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-disposablestack-properties", rule, {
    valid: [
        ...[...disposableStackProperties].map((p) => `DisposableStack.${p}`),
        {
            code: "DisposableStack.unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "DisposableStack.unknown()",
            errors: [
                "Non-standard 'DisposableStack.unknown' property is forbidden.",
            ],
        },
        {
            code: "DisposableStack.foo",
            errors: [
                "Non-standard 'DisposableStack.foo' property is forbidden.",
            ],
        },
    ],
})
