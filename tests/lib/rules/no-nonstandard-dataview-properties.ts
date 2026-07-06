import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-dataview-properties.ts"
import { dataViewProperties } from "../../../lib/util/well-known-properties.ts"

new RuleTester().run("no-nonstandard-dataview-properties", rule, {
    valid: [
        ...[...dataViewProperties].map((p) => `DataView.${p}`),
        { code: "DataView.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "DataView.unknown()",
            errors: ["Non-standard 'DataView.unknown' property is forbidden."],
        },
        {
            code: "DataView.foo",
            errors: ["Non-standard 'DataView.foo' property is forbidden."],
        },
        {
            code: "DataView.bar",
            errors: ["Non-standard 'DataView.bar' property is forbidden."],
        },
    ],
})
