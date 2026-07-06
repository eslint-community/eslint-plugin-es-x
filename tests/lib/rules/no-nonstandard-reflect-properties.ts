import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-reflect-properties.ts"
import { reflectProperties } from "../../../lib/util/well-known-properties.ts"

new RuleTester().run("no-nonstandard-reflect-properties", rule, {
    valid: [
        ...[...reflectProperties].map((p) => `Reflect.${p}`),
        { code: "Reflect.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Reflect.unknown()",
            errors: ["Non-standard 'Reflect.unknown' property is forbidden."],
        },
        {
            code: "Reflect.foo",
            errors: ["Non-standard 'Reflect.foo' property is forbidden."],
        },
        {
            code: "Reflect.bar",
            errors: ["Non-standard 'Reflect.bar' property is forbidden."],
        },
    ],
})
