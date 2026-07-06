import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-disposablestack-properties.ts"
import { disposableStackProperties } from "../../../lib/util/well-known-properties.ts"

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
