"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-iterator-prototype-every.js")
const ruleId = "no-iterator-prototype-every"

new RuleTester().run(ruleId, rule, {
    valid: [
        "every(Boolean)",
        "foo.unknown(0)",
        "foo.every(Boolean)",
        {
            code: "every(Boolean)",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.unknown(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.every(Boolean)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "Iterator.from([]).every(Boolean)",
            errors: ["ES2025 'Iterator.prototype.every' method is forbidden."],
        },
        {
            code: "foo.every(Boolean)",
            errors: ["ES2025 'Iterator.prototype.every' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.every(Boolean)",
            options: [{ aggressive: true }],
            errors: ["ES2025 'Iterator.prototype.every' method is forbidden."],
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
        { filename, code: "every(Boolean)" },
        { filename, code: "foo.unknown(0)" },
        { filename, code: "foo.every(Boolean)" },
        {
            filename,
            code: "let foo = {}; foo.every(Boolean)",
        },
        {
            filename,
            code: "every(Boolean)",
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
            code: "let foo = Iterator.from([]); foo.every(Boolean)",
            errors: ["ES2025 'Iterator.prototype.every' method is forbidden."],
        },
        {
            filename,
            code: "function f(a: Iterator) { a.every(Boolean) }",
            errors: ["ES2025 'Iterator.prototype.every' method is forbidden."],
        },
        {
            filename,
            code: "foo.every(Boolean)",
            errors: ["ES2025 'Iterator.prototype.every' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
