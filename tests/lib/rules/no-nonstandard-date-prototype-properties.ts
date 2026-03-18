"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-date-prototype-properties.js")
const {
    datePrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-date-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...datePrototypeProperties].map((p) => `new Date().${p}`),
        { code: "new Date().unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "new Date().unknown()",
            errors: [
                "Non-standard 'Date.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "new Date().foo",
            errors: [
                "Non-standard 'Date.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "new Date().bar",
            errors: [
                "Non-standard 'Date.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "new Date()[0]",
            errors: ["Non-standard 'Date.prototype.0' property is forbidden."],
        },
        {
            code: "new Date()['0']",
            errors: ["Non-standard 'Date.prototype.0' property is forbidden."],
        },
        {
            code: "new Date()['01']",
            errors: ["Non-standard 'Date.prototype.01' property is forbidden."],
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
        ...[...datePrototypeProperties].map((p) => ({
            filename,
            code: `new Date().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "new Date().foo",
            errors: [
                "Non-standard 'Date.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Date().bar",
            errors: [
                "Non-standard 'Date.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Date()[0]",
            errors: ["Non-standard 'Date.prototype.0' property is forbidden."],
        },
        {
            filename,
            code: "new Date()['0']",
            errors: ["Non-standard 'Date.prototype.0' property is forbidden."],
        },
        {
            filename,
            code: "new Date()['01']",
            errors: ["Non-standard 'Date.prototype.01' property is forbidden."],
        },
        {
            filename,
            code: "let foo = new Date(); foo.foo",
            errors: [
                "Non-standard 'Date.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Date>(a: T) { a.baz }",
            errors: [
                "Non-standard 'Date.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
