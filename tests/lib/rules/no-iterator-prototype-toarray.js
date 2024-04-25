"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-iterator-prototype-toarray.js")
const ruleId = "no-iterator-prototype-toarray"

new RuleTester().run(ruleId, rule, {
    valid: [
        "toArray()",
        "foo.unknown(0)",
        "foo.toArray()",
        {
            code: "toArray()",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.unknown(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.toArray()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "Iterator.from([]).toArray()",
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
        },
        {
            code: "foo.toArray()",
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.toArray()",
            options: [{ aggressive: true }],
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: false } },
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
    languageOptions: { parser, parserOptions: { tsconfigRootDir, project } },
}).run(`${ruleId} TS Full Type Information`, rule, {
    valid: [
        { filename, code: "toArray()" },
        { filename, code: "foo.unknown(0)" },
        { filename, code: "foo.toArray()" },
        {
            filename,
            code: "let foo = {}; foo.toArray()",
        },
        {
            filename,
            code: "toArray()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.unknown(0)",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: "let foo = Iterator.from([]); foo.toArray()",
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f(a: Iterator) { a.toArray() }",
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.toArray()",
            errors: [
                "ES2025 'Iterator.prototype.toArray' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
