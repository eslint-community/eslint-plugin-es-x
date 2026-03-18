"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-symbol-prototype-properties.js")
const {
    symbolPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-symbol-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...symbolPrototypeProperties].map((p) => `Symbol().${p}`),
        { code: "Symbol().unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "Symbol().unknown()",
            errors: [
                "Non-standard 'Symbol.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "Symbol().foo",
            errors: [
                "Non-standard 'Symbol.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "Symbol().bar",
            errors: [
                "Non-standard 'Symbol.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "Symbol()[0]",
            errors: [
                "Non-standard 'Symbol.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "Symbol()['0']",
            errors: [
                "Non-standard 'Symbol.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "Symbol()['01']",
            errors: [
                "Non-standard 'Symbol.prototype.01' property is forbidden.",
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
        ...[...symbolPrototypeProperties].map((p) => ({
            filename,
            code: `Symbol().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "Symbol().foo",
            errors: [
                "Non-standard 'Symbol.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "Symbol().bar",
            errors: [
                "Non-standard 'Symbol.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "Symbol()[0]",
            errors: [
                "Non-standard 'Symbol.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "Symbol()['0']",
            errors: [
                "Non-standard 'Symbol.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "Symbol()['01']",
            errors: [
                "Non-standard 'Symbol.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = Symbol.iterator; foo.foo",
            errors: [
                "Non-standard 'Symbol.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = Symbol(); foo.bar",
            errors: [
                "Non-standard 'Symbol.prototype.bar' property is forbidden.",
            ],
        },
    ],
})
