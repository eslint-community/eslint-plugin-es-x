import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-nonstandard-weakref-properties"
import { weakRefProperties } from "../../../lib/util/well-known-properties"

new RuleTester().run("no-nonstandard-weakref-properties", rule, {
    valid: [
        ...[...weakRefProperties].map((p) => `WeakRef.${p}`),
        { code: "WeakRef.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "WeakRef.unknown()",
            errors: ["Non-standard 'WeakRef.unknown' property is forbidden."],
        },
        {
            code: "WeakRef.foo",
            errors: ["Non-standard 'WeakRef.foo' property is forbidden."],
        },
        {
            code: "WeakRef.bar",
            errors: ["Non-standard 'WeakRef.bar' property is forbidden."],
        },
    ],
})
