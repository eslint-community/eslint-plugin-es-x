import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-nonstandard-weakset-properties"
import { weakSetProperties } from "../../../lib/util/well-known-properties"

new RuleTester().run("no-nonstandard-weakset-properties", rule, {
    valid: [
        ...[...weakSetProperties].map((p) => `WeakSet.${p}`),
        { code: "WeakSet.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "WeakSet.unknown()",
            errors: ["Non-standard 'WeakSet.unknown' property is forbidden."],
        },
        {
            code: "WeakSet.foo",
            errors: ["Non-standard 'WeakSet.foo' property is forbidden."],
        },
        {
            code: "WeakSet.bar",
            errors: ["Non-standard 'WeakSet.bar' property is forbidden."],
        },
    ],
})
