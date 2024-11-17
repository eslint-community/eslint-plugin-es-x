"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-array-prototype-properties.js")
const {
    arrayPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-array-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...arrayPrototypeProperties].map((p) => `['A'].${p}`),
        "['A'][0]",
        "['A']['0']",
        { code: "['A'].unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "['A'].unknown()",
            errors: [
                "Non-standard 'Array.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "['A'].foo",
            errors: [
                "Non-standard 'Array.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "['A'].bar",
            errors: [
                "Non-standard 'Array.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "['A']['01']",
            errors: [
                "Non-standard 'Array.prototype.01' property is forbidden.",
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
        ...[...arrayPrototypeProperties].map((p) => ({
            filename,
            code: `['A'].${p}`,
        })),
        { filename, code: "['A'][0]" },
        { filename, code: "['A']['0']" },
        {
            filename,
            code: "let foo = /re/.exec('re'); foo.index",
        },
    ],
    invalid: [
        {
            filename,
            code: "['A'].foo",
            errors: [
                "Non-standard 'Array.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "['A'].bar",
            errors: [
                "Non-standard 'Array.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "['A']['01']",
            errors: [
                "Non-standard 'Array.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = ['A']; foo.foo",
            errors: [
                "Non-standard 'Array.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = Array(''); foo.bar",
            errors: [
                "Non-standard 'Array.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.baz }",
            errors: [
                "Non-standard 'Array.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
