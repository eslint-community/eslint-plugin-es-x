"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-tosorted.js")
const ruleId = "no-array-prototype-tosorted"

new RuleTester().run(ruleId, rule, {
    valid: [
        "toSorted()",
        "foo.find(predicate)",
        "foo.toSorted()",
        {
            code: "toSorted()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.find(predicate)",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.toSorted()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "['foo'].toSorted()",
            errors: ["ES2023 'Array.prototype.toSorted' method is forbidden."],
        },
        {
            code: "foo.toSorted()",
            errors: ["ES2023 'Array.prototype.toSorted' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.toSorted()",
            options: [{ aggressive: true }],
            errors: ["ES2023 'Array.prototype.toSorted' method is forbidden."],
            settings: { "es-x": { aggressive: false } },
        },
    ],
})

// -----------------------------------------------------------------------------
// TypeScript
// -----------------------------------------------------------------------------
const parser = require.resolve("@typescript-eslint/parser")
const tsconfigRootDir = path.resolve(__dirname, "../../fixtures")
const project = "tsconfig.json"
const filename = path.join(tsconfigRootDir, "test.ts")

new RuleTester({ parser }).run(`${ruleId} TS`, rule, {
    valid: [
        { filename, code: "toSorted()" },
        { filename, code: "foo.find(predicate)" },
        { filename, code: "foo.toSorted()" },
        { filename, code: "let foo = {}; foo.toSorted()" },
        {
            filename,
            code: "toSorted()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.find(predicate)",
            settings: { "es-x": { aggressive: true } },
        },

        // `Array` is unknown type if tsconfig.json is not configured.
        { filename, code: "let foo = []; foo.toSorted()" },
        {
            filename,
            code: "let foo = ['foo']; foo.toSorted()",
            errors: ["ES2023 'Array.prototype.toSorted' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends string[]>(a: T) { a.toSorted() }",
            errors: ["ES2023 'Array.prototype.toSorted' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends (string | number)[]>(a: T) { a.toSorted() }",
            errors: ["ES2023 'Array.prototype.toSorted' method is forbidden."],
        },
    ],
    invalid: [
        {
            filename,
            code: "['foo'].toSorted()",
            errors: ["ES2023 'Array.prototype.toSorted' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.toSorted()",
            errors: ["ES2023 'Array.prototype.toSorted' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.toSorted()",
            errors: ["ES2023 'Array.prototype.toSorted' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Type Information`,
    rule,
    {
        valid: [
            { filename, code: "toSorted()" },
            { filename, code: "foo.find(predicate)" },
            { filename, code: "foo.toSorted()" },
            { filename, code: "let foo = {}; foo.toSorted()" },
            {
                filename,
                code: "toSorted()",
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
                code: "['foo'].toSorted()",
                errors: [
                    "ES2023 'Array.prototype.toSorted' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = ['foo']; foo.toSorted()",
                errors: [
                    "ES2023 'Array.prototype.toSorted' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = []; foo.toSorted()",
                errors: [
                    "ES2023 'Array.prototype.toSorted' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends string[]>(a: T) { a.toSorted() }",
                errors: [
                    "ES2023 'Array.prototype.toSorted' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends (string | number)[]>(a: T) { a.toSorted() }",
                errors: [
                    "ES2023 'Array.prototype.toSorted' method is forbidden.",
                ],
            },
            {
                filename,
                code: "foo.toSorted()",
                errors: [
                    "ES2023 'Array.prototype.toSorted' method is forbidden.",
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
                code: `let foo = new ${className}(10); foo.toSorted()`,
                errors: [
                    `ES2023 '${className}.prototype.toSorted' method is forbidden.`,
                ],
            })),
        ],
    },
)
