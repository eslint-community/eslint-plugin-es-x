"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-with.js")
const ruleId = "no-array-prototype-with"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo.find(predicate)",
        "foo.with(index, value)",
        {
            code: "foo.find(predicate)",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.with(index, value)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "['foo'].with(index, value)",
            errors: ["ES2023 'Array.prototype.with' method is forbidden."],
        },
        {
            code: "foo.with(index, value)",
            errors: ["ES2023 'Array.prototype.with' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.with(index, value)",
            options: [{ aggressive: true }],
            errors: ["ES2023 'Array.prototype.with' method is forbidden."],
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
        { filename, code: "foo.find(predicate)" },
        { filename, code: "foo.with(index, value)" },
        { filename, code: "let foo = {}; foo.with(index, value)" },
        {
            filename,
            code: "foo.find(predicate)",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: "['foo'].with(index, value)",
            errors: ["ES2023 'Array.prototype.with' method is forbidden."],
        },
        {
            filename,
            code: "let foo = ['foo']; foo.with(index, value)",
            errors: ["ES2023 'Array.prototype.with' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.with(index, value)",
            errors: ["ES2023 'Array.prototype.with' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends string[]>(a: T) { a.with(index, value) }",
            errors: ["ES2023 'Array.prototype.with' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends (string | number)[]>(a: T) { a.with(index, value) }",
            errors: ["ES2023 'Array.prototype.with' method is forbidden."],
        },
        {
            filename,
            code: "foo.with(index, value)",
            errors: ["ES2023 'Array.prototype.with' method is forbidden."],
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
            code: `let foo = new ${className}(10); foo.with(index, value)`,
            errors: [
                `ES2023 '${className}.prototype.with' method is forbidden.`,
            ],
        })),
    ],
})
