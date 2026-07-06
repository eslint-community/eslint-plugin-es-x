import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-proxy-properties.ts"
import { proxyProperties } from "../../../lib/util/well-known-properties.ts"

new RuleTester().run("no-nonstandard-proxy-properties", rule, {
    valid: [
        ...[...proxyProperties].map((p) => `Proxy.${p}`),
        { code: "Proxy.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Proxy.unknown()",
            errors: ["Non-standard 'Proxy.unknown' property is forbidden."],
        },
        {
            code: "Proxy.foo",
            errors: ["Non-standard 'Proxy.foo' property is forbidden."],
        },
        {
            code: "Proxy.bar",
            errors: ["Non-standard 'Proxy.bar' property is forbidden."],
        },
    ],
})
