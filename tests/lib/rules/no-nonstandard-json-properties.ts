import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-json-properties.ts"
import { jsonProperties } from "../../../lib/util/well-known-properties.ts"

new RuleTester().run("no-nonstandard-json-properties", rule, {
    valid: [
        ...[...jsonProperties].map((p) => `JSON.${p}`),
        { code: "JSON.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "JSON.unknown()",
            errors: ["Non-standard 'JSON.unknown' property is forbidden."],
        },
        {
            code: "JSON.foo",
            errors: ["Non-standard 'JSON.foo' property is forbidden."],
        },
        {
            code: "JSON.bar",
            errors: ["Non-standard 'JSON.bar' property is forbidden."],
        },
    ],
})
