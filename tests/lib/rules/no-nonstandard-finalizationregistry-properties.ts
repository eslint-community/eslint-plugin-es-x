import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-nonstandard-finalizationregistry-properties.ts"
import { finalizationRegistryProperties } from "../../../lib/util/well-known-properties.ts"

new RuleTester().run("no-nonstandard-finalizationregistry-properties", rule, {
    valid: [
        ...[...finalizationRegistryProperties].map(
            (p) => `FinalizationRegistry.${p}`,
        ),
        {
            code: "FinalizationRegistry.unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "FinalizationRegistry.unknown()",
            errors: [
                "Non-standard 'FinalizationRegistry.unknown' property is forbidden.",
            ],
        },
        {
            code: "FinalizationRegistry.foo",
            errors: [
                "Non-standard 'FinalizationRegistry.foo' property is forbidden.",
            ],
        },
        {
            code: "FinalizationRegistry.bar",
            errors: [
                "Non-standard 'FinalizationRegistry.bar' property is forbidden.",
            ],
        },
    ],
})
