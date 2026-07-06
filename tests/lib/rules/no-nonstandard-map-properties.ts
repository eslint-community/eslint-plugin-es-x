import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-map-properties.ts"
import { mapProperties } from "../../../lib/util/well-known-properties.ts"

new RuleTester().run("no-nonstandard-map-properties", rule, {
    valid: [
        ...[...mapProperties].map((p) => `Map.${p}`),
        { code: "Map.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Map.unknown()",
            errors: ["Non-standard 'Map.unknown' property is forbidden."],
        },
        {
            code: "Map.foo",
            errors: ["Non-standard 'Map.foo' property is forbidden."],
        },
        {
            code: "Map.bar",
            errors: ["Non-standard 'Map.bar' property is forbidden."],
        },
    ],
})
