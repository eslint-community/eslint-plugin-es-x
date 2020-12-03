/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-entries.js")
const ruleId = "no-array-prototype-entries"

new RuleTester().run(ruleId, rule, {
    valid: [
        "entries()",
        "foo.reverse()",
        "foo.entries()",
        { code: "entries()", settings: { es: { aggressive: true } } },
        { code: "foo.reverse()", settings: { es: { aggressive: true } } },
        {
            code: "foo.entries()",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.entries()",
            errors: ["ES2015 'Array.prototype.entries' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.entries()",
            options: [{ aggressive: true }],
            errors: ["ES2015 'Array.prototype.entries' method is forbidden."],
            settings: { es: { aggressive: false } },
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
        { filename, code: "entries()" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.entries()" },
        { filename, code: "let foo = {}; foo.entries()" },
        {
            filename,
            code: "entries()",
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.reverse()",
            settings: { es: { aggressive: true } },
        },

        // `Array` is unknown type if tsconfig.json is not configured.
        { filename, code: "let foo = []; foo.entries()" },
        { filename, code: "let foo = Array(); foo.entries()" },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.entries() }",
        },
        {
            filename,
            code:
                "function f<T extends string[] | number[]>(a: T) { a.entries() }",
        },
    ],
    invalid: [
        {
            filename,
            code: "[a, b, c].entries()",
            errors: ["ES2015 'Array.prototype.entries' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.entries()",
            errors: ["ES2015 'Array.prototype.entries' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "let foo = Array(); foo.entries()",
            errors: ["ES2015 'Array.prototype.entries' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.entries() }",
            errors: ["ES2015 'Array.prototype.entries' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code:
                "function f<T extends string[] | number[]>(a: T) { a.entries() }",
            errors: ["ES2015 'Array.prototype.entries' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.entries()",
            errors: ["ES2015 'Array.prototype.entries' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
    ],
})

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Type Information`,
    rule,
    {
        valid: [
            { filename, code: "entries()" },
            { filename, code: "foo.reverse()" },
            { filename, code: "foo.entries()" },
            { filename, code: "let foo = {}; foo.entries()" },
            {
                filename,
                code: "entries()",
                settings: { es: { aggressive: true } },
            },
            {
                filename,
                code: "foo.reverse()",
                settings: { es: { aggressive: true } },
            },
        ],
        invalid: [
            {
                filename,
                code: "[a, b, c].entries()",
                errors: [
                    "ES2015 'Array.prototype.entries' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = []; foo.entries()",
                errors: [
                    "ES2015 'Array.prototype.entries' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = Array(); foo.entries()",
                errors: [
                    "ES2015 'Array.prototype.entries' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends any[]>(a: T) { a.entries() }",
                errors: [
                    "ES2015 'Array.prototype.entries' method is forbidden.",
                ],
            },
            {
                filename,
                code:
                    "function f<T extends readonly any[]>(a: T) { a.entries() }",
                errors: [
                    "ES2015 'Array.prototype.entries' method is forbidden.",
                ],
            },
            {
                filename,
                code:
                    "function f<T extends string[] | number[]>(a: T) { a.entries() }",
                errors: [
                    "ES2015 'Array.prototype.entries' method is forbidden.",
                ],
            },
            {
                filename,
                code: "foo.entries()",
                errors: [
                    "ES2015 'Array.prototype.entries' method is forbidden.",
                ],
                settings: { es: { aggressive: true } },
            },
        ],
    },
)
