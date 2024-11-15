"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-promise-prototype-properties.js")
const {
    promisePrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-promise-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...promisePrototypeProperties].map((p) => `Promise.resolve().${p}`),
        {
            code: "Promise.resolve().unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "Promise.resolve().unknown()",
            errors: [
                "Non-standard 'Promise.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "Promise.resolve().foo",
            errors: [
                "Non-standard 'Promise.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "Promise.resolve().bar",
            errors: [
                "Non-standard 'Promise.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "Promise.resolve()[0]",
            errors: [
                "Non-standard 'Promise.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "Promise.resolve()['0']",
            errors: [
                "Non-standard 'Promise.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "Promise.resolve()['01']",
            errors: [
                "Non-standard 'Promise.prototype.01' property is forbidden.",
            ],
        },
        {
            code: "const foo = import('foo'); foo['01']",
            errors: [
                "Non-standard 'Promise.prototype.01' property is forbidden.",
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
        ...[...promisePrototypeProperties].map((p) => ({
            filename,
            code: `Promise.resolve().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "Promise.resolve().foo",
            errors: [
                "Non-standard 'Promise.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "Promise.resolve().bar",
            errors: [
                "Non-standard 'Promise.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "Promise.resolve()[0]",
            errors: [
                "Non-standard 'Promise.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "Promise.resolve()['0']",
            errors: [
                "Non-standard 'Promise.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "Promise.resolve()['01']",
            errors: [
                "Non-standard 'Promise.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = Promise.resolve(); foo.foo",
            errors: [
                "Non-standard 'Promise.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new Promise(); foo.bar",
            errors: [
                "Non-standard 'Promise.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Promise<any>>(a: T) { a.baz }",
            errors: [
                "Non-standard 'Promise.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
