"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-findlast-findlastindex.js")
const ruleId = "no-array-prototype-findlast-findlastindex"

new RuleTester().run(ruleId, rule, {
    valid: [
        "findLast(predicate)",
        "findLastIndex(predicate)",
        "foo.find(predicate)",
        "foo.findLast(predicate)",
        "foo.findLastIndex(predicate)",
        {
            code: "findLast(predicate)",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "findLastIndex(predicate)",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.find(predicate)",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.findLast(predicate)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "['foo'].findLast(predicate)",
            errors: ["ES2023 'Array.prototype.findLast' method is forbidden."],
        },
        {
            code: "['foo'].findLastIndex(predicate)",
            errors: [
                "ES2023 'Array.prototype.findLastIndex' method is forbidden.",
            ],
        },
        {
            code: "foo.findLast(predicate)",
            errors: ["ES2023 'Array.prototype.findLast' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.findLastIndex(predicate)",
            errors: [
                "ES2023 'Array.prototype.findLastIndex' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.findLast(predicate)",
            options: [{ aggressive: true }],
            errors: ["ES2023 'Array.prototype.findLast' method is forbidden."],
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
        { filename, code: "findLast(predicate)" },
        { filename, code: "foo.find(predicate)" },
        { filename, code: "foo.findLast(predicate)" },
        { filename, code: "let foo = {}; foo.findLast(predicate)" },
        {
            filename,
            code: "findLast(predicate)",
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.find(predicate)",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: "['foo'].findLast(predicate)",
            errors: ["ES2023 'Array.prototype.findLast' method is forbidden."],
        },
        {
            filename,
            code: "['foo'].findLastIndex(predicate)",
            errors: [
                "ES2023 'Array.prototype.findLastIndex' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = ['foo']; foo.findLast(predicate)",
            errors: ["ES2023 'Array.prototype.findLast' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.findLast(predicate)",
            errors: ["ES2023 'Array.prototype.findLast' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends string[]>(a: T) { a.findLast(predicate) }",
            errors: ["ES2023 'Array.prototype.findLast' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends (string | number)[]>(a: T) { a.findLast(predicate) }",
            errors: ["ES2023 'Array.prototype.findLast' method is forbidden."],
        },
        {
            filename,
            code: "foo.findLast(predicate)",
            errors: ["ES2023 'Array.prototype.findLast' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        ...[
            "Int8Array",
            "Uint8Array",
            "Uint8ClampedArray",
            "Int16Array",
            "Uint16Array",
            "Int32Array",
            "Uint32Array",
            "Float32Array",
            "Float64Array",
            "BigInt64Array",
            "BigUint64Array",
        ].map((className) => ({
            filename,
            code: `let foo = new ${className}(10); foo.findLast(predicate)`,
            errors: [
                `ES2023 '${className}.prototype.findLast' method is forbidden.`,
            ],
        })),
    ],
})
