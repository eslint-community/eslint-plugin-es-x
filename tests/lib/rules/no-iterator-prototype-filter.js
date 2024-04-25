"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-iterator-prototype-filter.js")
const ruleId = "no-iterator-prototype-filter"

new RuleTester().run(ruleId, rule, {
    valid: [
        "filter(String)",
        "foo.unknown(0)",
        "foo.filter(String)",
        {
            code: "filter(String)",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.unknown(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.filter(String)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "Iterator.from([]).filter(String)",
            errors: ["ES2025 'Iterator.prototype.filter' method is forbidden."],
        },
        {
            code: "foo.filter(String)",
            errors: ["ES2025 'Iterator.prototype.filter' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.filter(String)",
            options: [{ aggressive: true }],
            errors: ["ES2025 'Iterator.prototype.filter' method is forbidden."],
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
        { filename, code: "filter(String)" },
        { filename, code: "foo.unknown(0)" },
        { filename, code: "foo.filter(String)" },
        {
            filename,
            code: "let foo = {}; foo.filter(String)",
        },
        {
            filename,
            code: "filter(String)",
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
            code: "let foo = Iterator.from([]); foo.filter(String)",
            errors: ["ES2025 'Iterator.prototype.filter' method is forbidden."],
        },
        {
            filename,
            code: "function f(a: Iterator) { a.filter(String) }",
            errors: ["ES2025 'Iterator.prototype.filter' method is forbidden."],
        },
        {
            filename,
            code: "foo.filter(String)",
            errors: ["ES2025 'Iterator.prototype.filter' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
