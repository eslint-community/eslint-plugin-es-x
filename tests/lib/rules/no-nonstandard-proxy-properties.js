"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-proxy-properties.js")
const { proxyProperties } = require("../../../lib/util/well-known-properties")

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
