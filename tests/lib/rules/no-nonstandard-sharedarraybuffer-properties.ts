import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-nonstandard-sharedarraybuffer-properties"
import { sharedArrayBufferProperties } from "../../../lib/util/well-known-properties"

new RuleTester().run("no-nonstandard-sharedarraybuffer-properties", rule, {
    valid: [
        ...[...sharedArrayBufferProperties].map(
            (p) => `SharedArrayBuffer.${p}`,
        ),
        {
            code: "SharedArrayBuffer.unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "SharedArrayBuffer.unknown()",
            errors: [
                "Non-standard 'SharedArrayBuffer.unknown' property is forbidden.",
            ],
        },
        {
            code: "SharedArrayBuffer.foo",
            errors: [
                "Non-standard 'SharedArrayBuffer.foo' property is forbidden.",
            ],
        },
        {
            code: "SharedArrayBuffer.bar",
            errors: [
                "Non-standard 'SharedArrayBuffer.bar' property is forbidden.",
            ],
        },
    ],
})
