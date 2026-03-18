import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-nonstandard-math-properties"
import { mathProperties } from "../../../lib/util/well-known-properties"

new RuleTester().run("no-nonstandard-math-properties", rule, {
    valid: [
        ...[...mathProperties].map((p) => `Math.${p}`),
        { code: "Math.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Math.unknown()",
            errors: ["Non-standard 'Math.unknown' property is forbidden."],
        },
        {
            code: "Math.foo",
            errors: ["Non-standard 'Math.foo' property is forbidden."],
        },
        {
            code: "Math.bar",
            errors: ["Non-standard 'Math.bar' property is forbidden."],
        },
    ],
})
