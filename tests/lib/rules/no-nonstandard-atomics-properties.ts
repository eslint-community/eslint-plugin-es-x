import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-nonstandard-atomics-properties"
import { atomicsProperties } from "../../../lib/util/well-known-properties"

new RuleTester().run("no-nonstandard-atomics-properties", rule, {
    valid: [
        ...[...atomicsProperties].map((p) => `Atomics.${p}`),
        { code: "Atomics.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Atomics.unknown()",
            errors: ["Non-standard 'Atomics.unknown' property is forbidden."],
        },
        {
            code: "Atomics.foo",
            errors: ["Non-standard 'Atomics.foo' property is forbidden."],
        },
        {
            code: "Atomics.bar",
            errors: ["Non-standard 'Atomics.bar' property is forbidden."],
        },
    ],
})
