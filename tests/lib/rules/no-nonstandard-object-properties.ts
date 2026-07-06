import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-object-properties.ts"
import { objectProperties } from "../../../lib/util/well-known-properties.ts"

new RuleTester().run("no-nonstandard-object-properties", rule, {
    valid: [
        ...[...objectProperties].map((p) => `Object.${p}`),
        { code: "Object.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Object.unknown()",
            errors: ["Non-standard 'Object.unknown' property is forbidden."],
        },
        {
            code: "Object.foo",
            errors: ["Non-standard 'Object.foo' property is forbidden."],
        },
        {
            code: "Object.bar",
            errors: ["Non-standard 'Object.bar' property is forbidden."],
        },
    ],
})
