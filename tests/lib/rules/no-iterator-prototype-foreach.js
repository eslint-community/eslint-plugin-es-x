"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-iterator-prototype-foreach.js")
const ruleId = "no-iterator-prototype-foreach"

new RuleTester().run(ruleId, rule, {
    valid: [
        "forEach(a => console.log(a))",
        "foo.unknown(0)",
        "foo.forEach(a => console.log(a))",
        {
            code: "forEach(a => console.log(a))",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.unknown(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.forEach(a => console.log(a))",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "Iterator.from([]).forEach(a => console.log(a))",
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
            ],
        },
        {
            code: "foo.forEach(a => console.log(a))",
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.forEach(a => console.log(a))",
            options: [{ aggressive: true }],
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
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
        { filename, code: "forEach(a => console.log(a))" },
        { filename, code: "foo.unknown(0)" },
        { filename, code: "foo.forEach(a => console.log(a))" },
        {
            filename,
            code: "let foo = {}; foo.forEach(a => console.log(a))",
        },
        {
            filename,
            code: "forEach(a => console.log(a))",
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
            code: "let foo = Iterator.from([]); foo.forEach(a => console.log(a))",
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f(a: Iterator) { a.forEach(a => console.log(a)) }",
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.forEach(a => console.log(a))",
            errors: [
                "ES2025 'Iterator.prototype.forEach' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
