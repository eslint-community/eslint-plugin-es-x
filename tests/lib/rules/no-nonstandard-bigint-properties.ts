import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-nonstandard-bigint-properties"
import { bigintProperties } from "../../../lib/util/well-known-properties"

new RuleTester().run("no-nonstandard-bigint-properties", rule, {
    valid: [
        ...[...bigintProperties].map((p) => `BigInt.${p}`),
        { code: "BigInt.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "BigInt.unknown()",
            errors: ["Non-standard 'BigInt.unknown' property is forbidden."],
        },
        {
            code: "BigInt.foo",
            errors: ["Non-standard 'BigInt.foo' property is forbidden."],
        },
        {
            code: "BigInt.bar",
            errors: ["Non-standard 'BigInt.bar' property is forbidden."],
        },
    ],
})
