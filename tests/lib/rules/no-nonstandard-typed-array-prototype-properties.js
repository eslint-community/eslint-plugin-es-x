"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-typed-array-prototype-properties.js")
const {
    typedArrayPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-typed-array-prototype-properties"

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

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...typedArrayList.flatMap((className) => [
            ...[...typedArrayPrototypeProperties].map(
                (p) => `new ${className}().${p}`,
            ),
            `new ${className}()[0]`,
            `new ${className}()['0']`,
            {
                code: `new ${className}().unknown()`,
                options: [{ allow: ["unknown"] }],
            },
        ]),
    ],
    invalid: [
        ...typedArrayList.flatMap((className) => [
            {
                code: `new ${className}().unknown()`,
                errors: [
                    `Non-standard '${className}.prototype.unknown' property is forbidden.`,
                ],
            },
            {
                code: `new ${className}().foo`,
                errors: [
                    `Non-standard '${className}.prototype.foo' property is forbidden.`,
                ],
            },
            {
                code: `new ${className}().bar`,
                errors: [
                    `Non-standard '${className}.prototype.bar' property is forbidden.`,
                ],
            },
            {
                code: `new ${className}()['01']`,
                errors: [
                    `Non-standard '${className}.prototype.01' property is forbidden.`,
                ],
            },
        ]),
    ],
})

// -----------------------------------------------------------------------------
// TypeScript
// -----------------------------------------------------------------------------
const parser = require("@typescript-eslint/parser")
const tsconfigRootDir = path.resolve(__dirname, "../../fixtures")
const project = "tsconfig.json"
const filename = path.join(tsconfigRootDir, "test.ts")

new RuleTester({
    languageOptions: {
        parser,
        parserOptions: {
            tsconfigRootDir,
            project,
            disallowAutomaticSingleRunInference: true,
        },
    },
}).run(`${ruleId} TS Full Type Information`, rule, {
    valid: [
        { filename, code: "foo" },
        { filename, code: "foo.toString" },
        { filename, code: "foo.foo" },
        { filename, code: "let foo = {}; foo.foo" },
        ...typedArrayList.flatMap((className) => [
            ...[...typedArrayPrototypeProperties].map((p) => ({
                filename,
                code: `new ${className}().${p}`,
            })),
            { filename, code: `new ${className}()[0]` },
            { filename, code: `new ${className}()['0']` },
        ]),
    ],
    invalid: [
        ...typedArrayList.flatMap((className) => [
            {
                filename,
                code: `new ${className}().foo`,
                errors: [
                    `Non-standard '${className}.prototype.foo' property is forbidden.`,
                ],
            },
            {
                filename,
                code: `new ${className}().bar`,
                errors: [
                    `Non-standard '${className}.prototype.bar' property is forbidden.`,
                ],
            },
            {
                filename,
                code: `new ${className}()['01']`,
                errors: [
                    `Non-standard '${className}.prototype.01' property is forbidden.`,
                ],
            },
            {
                filename,
                code: `let foo = new ${className}(); foo.foo`,
                errors: [
                    `Non-standard '${className}.prototype.foo' property is forbidden.`,
                ],
            },
            {
                filename,
                code: `let foo = ${className}.from(''); foo.bar`,
                errors: [
                    `Non-standard '${className}.prototype.bar' property is forbidden.`,
                ],
            },
            {
                filename,
                code: `function f<T extends ${className}>(a: T) { a.baz }`,
                errors: [
                    `Non-standard '${className}.prototype.baz' property is forbidden.`,
                ],
            },
        ]),
    ],
})
