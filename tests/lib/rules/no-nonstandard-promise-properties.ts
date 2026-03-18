import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-nonstandard-promise-properties"
import { promiseProperties } from "../../../lib/util/well-known-properties"

new RuleTester().run("no-nonstandard-promise-properties", rule, {
    valid: [
        ...[...promiseProperties].map((p) => `Promise.${p}`),
        { code: "Promise.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Promise.unknown()",
            errors: ["Non-standard 'Promise.unknown' property is forbidden."],
        },
        {
            code: "Promise.foo",
            errors: ["Non-standard 'Promise.foo' property is forbidden."],
        },
        {
            code: "Promise.bar",
            errors: ["Non-standard 'Promise.bar' property is forbidden."],
        },
    ],
})
