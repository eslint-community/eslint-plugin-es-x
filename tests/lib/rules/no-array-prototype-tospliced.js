"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-tospliced.js")
const ruleId = "no-array-prototype-tospliced"

new RuleTester().run(ruleId, rule, {
    valid: [
        "toSpliced(1, 2)",
        "foo.find(predicate)",
        "foo.toSpliced(1, 2)",
        {
            code: "toSpliced(1, 2)",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.find(predicate)",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.toSpliced(1, 2)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "['foo'].toSpliced(1, 2)",
            errors: ["ES2023 'Array.prototype.toSpliced' method is forbidden."],
        },
        {
            code: "foo.toSpliced(1, 2)",
            errors: ["ES2023 'Array.prototype.toSpliced' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.toSpliced(1, 2)",
            options: [{ aggressive: true }],
            errors: ["ES2023 'Array.prototype.toSpliced' method is forbidden."],
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
        { filename, code: "toSpliced(1, 2)" },
        { filename, code: "foo.find(predicate)" },
        { filename, code: "foo.toSpliced(1, 2)" },
        { filename, code: "let foo = {}; foo.toSpliced(1, 2)" },
        {
            filename,
            code: "toSpliced(1, 2)",
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.find(predicate)",
            settings: { "es-x": { aggressive: true } },
        },

        // `Array` is unknown type if tsconfig.json is not configured.
        { filename, code: "let foo = []; foo.toSpliced(1, 2)" },
        {
            filename,
            code: "let foo = ['foo']; foo.toSpliced(1, 2)",
            errors: ["ES2023 'Array.prototype.toSpliced' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends string[]>(a: T) { a.toSpliced(1, 2) }",
            errors: ["ES2023 'Array.prototype.toSpliced' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends (string | number)[]>(a: T) { a.toSpliced(1, 2) }",
            errors: ["ES2023 'Array.prototype.toSpliced' method is forbidden."],
        },
    ],
    invalid: [
        {
            filename,
            code: "['foo'].toSpliced(1, 2)",
            errors: ["ES2023 'Array.prototype.toSpliced' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.toSpliced(1, 2)",
            errors: ["ES2023 'Array.prototype.toSpliced' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.toSpliced(1, 2)",
            errors: ["ES2023 'Array.prototype.toSpliced' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Type Information`,
    rule,
    {
        valid: [
            { filename, code: "toSpliced(1, 2)" },
            { filename, code: "foo.find(predicate)" },
            { filename, code: "foo.toSpliced(1, 2)" },
            { filename, code: "let foo = {}; foo.toSpliced(1, 2)" },
            {
                filename,
                code: "toSpliced(1, 2)",
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
                code: "['foo'].toSpliced(1, 2)",
                errors: [
                    "ES2023 'Array.prototype.toSpliced' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = ['foo']; foo.toSpliced(1, 2)",
                errors: [
                    "ES2023 'Array.prototype.toSpliced' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = []; foo.toSpliced(1, 2)",
                errors: [
                    "ES2023 'Array.prototype.toSpliced' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends string[]>(a: T) { a.toSpliced(1, 2) }",
                errors: [
                    "ES2023 'Array.prototype.toSpliced' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends (string | number)[]>(a: T) { a.toSpliced(1, 2) }",
                errors: [
                    "ES2023 'Array.prototype.toSpliced' method is forbidden.",
                ],
            },
            {
                filename,
                code: "foo.toSpliced(1, 2)",
                errors: [
                    "ES2023 'Array.prototype.toSpliced' method is forbidden.",
                ],
                settings: { "es-x": { aggressive: true } },
            },
        ],
    },
)
