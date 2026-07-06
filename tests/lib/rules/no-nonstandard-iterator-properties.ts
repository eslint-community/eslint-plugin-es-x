import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-iterator-properties.ts"
import { iteratorProperties } from "../../../lib/util/well-known-properties.ts"

new RuleTester().run("no-nonstandard-iterator-properties", rule, {
    valid: [
        ...[...iteratorProperties].map((p) => `Iterator.${p}`),
        { code: "Iterator.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Iterator.unknown()",
            errors: ["Non-standard 'Iterator.unknown' property is forbidden."],
        },
        {
            code: "Iterator.foo",
            errors: ["Non-standard 'Iterator.foo' property is forbidden."],
        },
        {
            code: "Iterator.bar",
            errors: ["Non-standard 'Iterator.bar' property is forbidden."],
        },
    ],
})
