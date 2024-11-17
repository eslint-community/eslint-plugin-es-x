"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-regexp-prototype-properties.js")
const {
    regexpPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-regexp-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...regexpPrototypeProperties].map((p) => `/foo/u.${p}`),
        { code: "/foo/u.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "/foo/u.unknown()",
            errors: [
                "Non-standard 'RegExp.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "/foo/u.foo",
            errors: [
                "Non-standard 'RegExp.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "/foo/u.bar",
            errors: [
                "Non-standard 'RegExp.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "/foo/u[0]",
            errors: [
                "Non-standard 'RegExp.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "/foo/u['0']",
            errors: [
                "Non-standard 'RegExp.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "/foo/u['01']",
            errors: [
                "Non-standard 'RegExp.prototype.01' property is forbidden.",
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
        ...[...regexpPrototypeProperties].map((p) => ({
            filename,
            code: `/foo/u.${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "/foo/u.foo",
            errors: [
                "Non-standard 'RegExp.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "/foo/u.bar",
            errors: [
                "Non-standard 'RegExp.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "/foo/u[0]",
            errors: [
                "Non-standard 'RegExp.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "/foo/u['0']",
            errors: [
                "Non-standard 'RegExp.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "/foo/u['01']",
            errors: [
                "Non-standard 'RegExp.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = /foo/u; foo.foo",
            errors: [
                "Non-standard 'RegExp.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new RegExp(''); foo.bar",
            errors: [
                "Non-standard 'RegExp.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends RegExp>(a: T) { a.baz }",
            errors: [
                "Non-standard 'RegExp.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
