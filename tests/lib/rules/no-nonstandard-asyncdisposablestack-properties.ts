import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-asyncdisposablestack-properties.ts"
import { asyncDisposableStackProperties } from "../../../lib/util/well-known-properties.ts"

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
