"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-string-prototype-properties.js")
const {
    stringPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-string-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...stringPrototypeProperties].map((p) => `'A'.${p}`),
        "'A'[0]",
        "'A'['0']",
        { code: "'A'.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "'A'.unknown()",
            errors: [
                "Non-standard 'String.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "'123'.foo",
            errors: [
                "Non-standard 'String.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "'123'.bar",
            errors: [
                "Non-standard 'String.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "'123'['01']",
            errors: [
                "Non-standard 'String.prototype.01' property is forbidden.",
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
        ...[...stringPrototypeProperties].map((p) => ({
            filename,
            code: `'A'.${p}`,
        })),
        { filename, code: "'A'[0]" },
        { filename, code: "'A'['0']" },
    ],
    invalid: [
        {
            filename,
            code: "'123'.foo",
            errors: [
                "Non-standard 'String.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "'123'.bar",
            errors: [
                "Non-standard 'String.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "'123'['01']",
            errors: [
                "Non-standard 'String.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = 'str'; foo.foo",
            errors: [
                "Non-standard 'String.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = String(42); foo.foo",
            errors: [
                "Non-standard 'String.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends string>(a: T) { a.foo }",
            errors: [
                "Non-standard 'String.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends 'a' | 'b'>(a: T) { a.foo }",
            errors: [
                "Non-standard 'String.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends 'a' | 'b' | 'c'>(a: T) { a.foo }",
            errors: [
                "Non-standard 'String.prototype.foo' property is forbidden.",
            ],
        },
    ],
})
