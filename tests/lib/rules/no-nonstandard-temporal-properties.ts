import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-nonstandard-temporal-properties"
import { temporalProperties } from "../../../lib/util/well-known-properties"

new RuleTester().run("no-nonstandard-temporal-properties", rule, {
    valid: [
        ...[...temporalProperties].map((p) => `Temporal.${p}`),
        { code: "Temporal.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Temporal.unknown()",
            errors: ["Non-standard 'Temporal.unknown' property is forbidden."],
        },
        {
            code: "Temporal.foo",
            errors: ["Non-standard 'Temporal.foo' property is forbidden."],
        },
    ],
})
