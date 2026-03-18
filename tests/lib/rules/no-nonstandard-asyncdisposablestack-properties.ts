"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-asyncdisposablestack-properties.js")
const {
    asyncDisposableStackProperties,
} = require("../../../lib/util/well-known-properties")

new RuleTester().run("no-nonstandard-asyncdisposablestack-properties", rule, {
    valid: [
        ...[...asyncDisposableStackProperties].map(
            (p) => `AsyncDisposableStack.${p}`,
        ),
        {
            code: "AsyncDisposableStack.unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "AsyncDisposableStack.unknown()",
            errors: [
                "Non-standard 'AsyncDisposableStack.unknown' property is forbidden.",
            ],
        },
        {
            code: "AsyncDisposableStack.foo",
            errors: [
                "Non-standard 'AsyncDisposableStack.foo' property is forbidden.",
            ],
        },
    ],
})
