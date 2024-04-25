"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-iterator-prototype-reduce.js")
const ruleId = "no-iterator-prototype-reduce"

new RuleTester().run(ruleId, rule, {
    valid: [
        "reduce((sum, value) => sum + value, 3)",
        "foo.unknown(0)",
        "foo.reduce((sum, value) => sum + value, 3)",
        {
            code: "reduce((sum, value) => sum + value, 3)",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.unknown(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.reduce((sum, value) => sum + value, 3)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "Iterator.from([]).reduce((sum, value) => sum + value, 3)",
            errors: ["ES2025 'Iterator.prototype.reduce' method is forbidden."],
        },
        {
            code: "foo.reduce((sum, value) => sum + value, 3)",
            errors: ["ES2025 'Iterator.prototype.reduce' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.reduce((sum, value) => sum + value, 3)",
            options: [{ aggressive: true }],
            errors: ["ES2025 'Iterator.prototype.reduce' method is forbidden."],
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
        { filename, code: "reduce((sum, value) => sum + value, 3)" },
        { filename, code: "foo.unknown(0)" },
        { filename, code: "foo.reduce((sum, value) => sum + value, 3)" },
        {
            filename,
            code: "let foo = {}; foo.reduce((sum, value) => sum + value, 3)",
        },
        {
            filename,
            code: "reduce((sum, value) => sum + value, 3)",
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
            code: "let foo = Iterator.from([]); foo.reduce((sum, value) => sum + value, 3)",
            errors: ["ES2025 'Iterator.prototype.reduce' method is forbidden."],
        },
        {
            filename,
            code: "function f(a: Iterator) { a.reduce((sum, value) => sum + value, 3) }",
            errors: ["ES2025 'Iterator.prototype.reduce' method is forbidden."],
        },
        {
            filename,
            code: "foo.reduce((sum, value) => sum + value, 3)",
            errors: ["ES2025 'Iterator.prototype.reduce' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
