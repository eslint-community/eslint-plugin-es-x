import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-weakmap-properties.ts"
import { weakMapProperties } from "../../../lib/util/well-known-properties.ts"

new RuleTester().run("no-nonstandard-weakmap-properties", rule, {
    valid: [
        ...[...weakMapProperties].map((p) => `WeakMap.${p}`),
        { code: "WeakMap.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "WeakMap.unknown()",
            errors: ["Non-standard 'WeakMap.unknown' property is forbidden."],
        },
        {
            code: "WeakMap.foo",
            errors: ["Non-standard 'WeakMap.foo' property is forbidden."],
        },
        {
            code: "WeakMap.bar",
            errors: ["Non-standard 'WeakMap.bar' property is forbidden."],
        },
    ],
})
