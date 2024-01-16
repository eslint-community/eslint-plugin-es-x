"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-toreversed.js")
const ruleId = "no-array-prototype-toreversed"

new RuleTester().run(ruleId, rule, {
    valid: [
        "toReversed()",
        "foo.find(predicate)",
        "foo.toReversed()",
        {
            code: "toReversed()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.find(predicate)",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.toReversed()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "['foo'].toReversed()",
            errors: [
                "ES2023 'Array.prototype.toReversed' method is forbidden.",
            ],
        },
        {
            code: "foo.toReversed()",
            errors: [
                "ES2023 'Array.prototype.toReversed' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.toReversed()",
            options: [{ aggressive: true }],
            errors: [
                "ES2023 'Array.prototype.toReversed' method is forbidden.",
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
        { filename, code: "toReversed()" },
        { filename, code: "foo.find(predicate)" },
        { filename, code: "foo.toReversed()" },
        { filename, code: "let foo = {}; foo.toReversed()" },
        {
            filename,
            code: "toReversed()",
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
            code: "['foo'].toReversed()",
            errors: [
                "ES2023 'Array.prototype.toReversed' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = ['foo']; foo.toReversed()",
            errors: [
                "ES2023 'Array.prototype.toReversed' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = []; foo.toReversed()",
            errors: [
                "ES2023 'Array.prototype.toReversed' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends string[]>(a: T) { a.toReversed() }",
            errors: [
                "ES2023 'Array.prototype.toReversed' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends (string | number)[]>(a: T) { a.toReversed() }",
            errors: [
                "ES2023 'Array.prototype.toReversed' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.toReversed()",
            errors: [
                "ES2023 'Array.prototype.toReversed' method is forbidden.",
            ],
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
            code: `let foo = new ${className}(10); foo.toReversed()`,
            errors: [
                `ES2023 '${className}.prototype.toReversed' method is forbidden.`,
            ],
        })),
    ],
})
