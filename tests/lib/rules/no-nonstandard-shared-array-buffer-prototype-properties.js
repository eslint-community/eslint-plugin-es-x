"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-shared-array-buffer-prototype-properties.js")
const {
    sharedArrayBufferPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-shared-array-buffer-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...sharedArrayBufferPrototypeProperties].map(
            (p) => `new SharedArrayBuffer().${p}`,
        ),
        {
            code: "new SharedArrayBuffer().unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "new SharedArrayBuffer().unknown()",
            errors: [
                "Non-standard 'SharedArrayBuffer.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "new SharedArrayBuffer().foo",
            errors: [
                "Non-standard 'SharedArrayBuffer.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "new SharedArrayBuffer().bar",
            errors: [
                "Non-standard 'SharedArrayBuffer.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "new SharedArrayBuffer()[0]",
            errors: [
                "Non-standard 'SharedArrayBuffer.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new SharedArrayBuffer()['0']",
            errors: [
                "Non-standard 'SharedArrayBuffer.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new SharedArrayBuffer()['01']",
            errors: [
                "Non-standard 'SharedArrayBuffer.prototype.01' property is forbidden.",
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
        ...[...sharedArrayBufferPrototypeProperties].map((p) => ({
            filename,
            code: `new SharedArrayBuffer().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "new SharedArrayBuffer().foo",
            errors: [
                "Non-standard 'SharedArrayBuffer.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new SharedArrayBuffer().bar",
            errors: [
                "Non-standard 'SharedArrayBuffer.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new SharedArrayBuffer()[0]",
            errors: [
                "Non-standard 'SharedArrayBuffer.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new SharedArrayBuffer()['0']",
            errors: [
                "Non-standard 'SharedArrayBuffer.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new SharedArrayBuffer()['01']",
            errors: [
                "Non-standard 'SharedArrayBuffer.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new SharedArrayBuffer(); foo.foo",
            errors: [
                "Non-standard 'SharedArrayBuffer.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends SharedArrayBuffer>(a: T) { a.baz }",
            errors: [
                "Non-standard 'SharedArrayBuffer.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
