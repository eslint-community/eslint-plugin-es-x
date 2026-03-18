"use strict"

const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-typed-array-properties.js")
const {
    typedArrayProperties,
    uint8ArrayProperties,
} = require("../../../lib/util/well-known-properties")

const typedArrayList = [
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Uint16Array",
    "Int32Array",
    "Uint32Array",
    "Float16Array",
    "Float32Array",
    "Float64Array",
    "BigInt64Array",
    "BigUint64Array",
]

new RuleTester().run("no-nonstandard-typed-array-properties", rule, {
    valid: [
        ...typedArrayList.flatMap((className) => [
            ...[...typedArrayProperties].map((p) => `${className}.${p}`),
            {
                code: `${className}.unknown()`,
                options: [{ allow: ["unknown"] }],
            },
        ]),
        ...[...uint8ArrayProperties]
            .filter((nm) => !typedArrayProperties.has(nm))
            .map((p) => `new Uint8Array().${p}`),
    ],
    invalid: [
        ...typedArrayList.flatMap((className) => [
            {
                code: `${className}.unknown()`,
                errors: [
                    `Non-standard '${className}.unknown' property is forbidden.`,
                ],
            },
            {
                code: `${className}.foo`,
                errors: [
                    `Non-standard '${className}.foo' property is forbidden.`,
                ],
            },
            {
                code: `${className}.bar`,
                errors: [
                    `Non-standard '${className}.bar' property is forbidden.`,
                ],
            },
        ]),
    ],
})
