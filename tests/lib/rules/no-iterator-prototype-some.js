"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-iterator-prototype-some.js")
const ruleId = "no-iterator-prototype-some"

new RuleTester().run(ruleId, rule, {
    valid: [
        "some(Boolean)",
        "foo.unknown(0)",
        "foo.some(Boolean)",
        {
            code: "some(Boolean)",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.unknown(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.some(Boolean)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "Iterator.from([]).some(Boolean)",
            errors: ["ES2025 'Iterator.prototype.some' method is forbidden."],
        },
        {
            code: "foo.some(Boolean)",
            errors: ["ES2025 'Iterator.prototype.some' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.some(Boolean)",
            options: [{ aggressive: true }],
            errors: ["ES2025 'Iterator.prototype.some' method is forbidden."],
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
        { filename, code: "some(Boolean)" },
        { filename, code: "foo.unknown(0)" },
        { filename, code: "foo.some(Boolean)" },
        {
            filename,
            code: "let foo = {}; foo.some(Boolean)",
        },
        {
            filename,
            code: "some(Boolean)",
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
            code: "let foo = Iterator.from([]); foo.some(Boolean)",
            errors: ["ES2025 'Iterator.prototype.some' method is forbidden."],
        },
        {
            filename,
            code: "function f(a: Iterator) { a.some(Boolean) }",
            errors: ["ES2025 'Iterator.prototype.some' method is forbidden."],
        },
        {
            filename,
            code: "foo.some(Boolean)",
            errors: ["ES2025 'Iterator.prototype.some' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
