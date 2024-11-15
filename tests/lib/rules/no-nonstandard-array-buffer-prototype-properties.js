"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-array-buffer-prototype-properties.js")
const {
    arrayBufferPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-array-buffer-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...arrayBufferPrototypeProperties].map(
            (p) => `new ArrayBuffer().${p}`,
        ),
        {
            code: "new ArrayBuffer().unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "new ArrayBuffer().unknown()",
            errors: [
                "Non-standard 'ArrayBuffer.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "new ArrayBuffer().foo",
            errors: [
                "Non-standard 'ArrayBuffer.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "new ArrayBuffer().bar",
            errors: [
                "Non-standard 'ArrayBuffer.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "new ArrayBuffer()[0]",
            errors: [
                "Non-standard 'ArrayBuffer.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new ArrayBuffer()['0']",
            errors: [
                "Non-standard 'ArrayBuffer.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new ArrayBuffer()['01']",
            errors: [
                "Non-standard 'ArrayBuffer.prototype.01' property is forbidden.",
            ],
        },
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
        ...[...arrayBufferPrototypeProperties].map((p) => ({
            filename,
            code: `new ArrayBuffer().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "new ArrayBuffer().foo",
            errors: [
                "Non-standard 'ArrayBuffer.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new ArrayBuffer().bar",
            errors: [
                "Non-standard 'ArrayBuffer.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new ArrayBuffer()[0]",
            errors: [
                "Non-standard 'ArrayBuffer.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new ArrayBuffer()['0']",
            errors: [
                "Non-standard 'ArrayBuffer.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new ArrayBuffer()['01']",
            errors: [
                "Non-standard 'ArrayBuffer.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new ArrayBuffer(); foo.foo",
            errors: [
                "Non-standard 'ArrayBuffer.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends ArrayBuffer>(a: T) { a.baz }",
            errors: [
                "Non-standard 'ArrayBuffer.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
