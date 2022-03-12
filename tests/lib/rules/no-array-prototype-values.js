/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-values.js")
const ruleId = "no-array-prototype-values"

new RuleTester().run(ruleId, rule, {
    valid: [
        "values()",
        "foo.reverse()",
        "foo.values()",
        { code: "values()", settings: { es: { aggressive: true } } },
        { code: "foo.reverse()", settings: { es: { aggressive: true } } },
        {
            code: "foo.values()",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.values()",
            errors: ["ES2015 'Array.prototype.values' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.values()",
            options: [{ aggressive: true }],
            errors: ["ES2015 'Array.prototype.values' method is forbidden."],
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
        { filename, code: "values()" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.values()" },
        { filename, code: "let foo = {}; foo.values()" },
        {
            filename,
            code: "values()",
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.reverse()",
            settings: { es: { aggressive: true } },
        },

        // `Array` is unknown type if tsconfig.json is not configured.
        { filename, code: "let foo = []; foo.values()" },
        { filename, code: "let foo = Array(); foo.values()" },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.values() }",
        },
        {
            filename,
            code: "function f<T extends string[] | number[]>(a: T) { a.values() }",
        },
    ],
    invalid: [
        {
            filename,
            code: "[a, b, c].values()",
            errors: ["ES2015 'Array.prototype.values' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.values()",
            errors: ["ES2015 'Array.prototype.values' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "let foo = Array(); foo.values()",
            errors: ["ES2015 'Array.prototype.values' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.values() }",
            errors: ["ES2015 'Array.prototype.values' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "function f<T extends string[] | number[]>(a: T) { a.values() }",
            errors: ["ES2015 'Array.prototype.values' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.values()",
            errors: ["ES2015 'Array.prototype.values' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
    ],
})

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Type Information`,
    rule,
    {
        valid: [
            { filename, code: "values()" },
            { filename, code: "foo.reverse()" },
            { filename, code: "foo.values()" },
            { filename, code: "let foo = {}; foo.values()" },
            {
                filename,
                code: "values()",
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
                code: "[a, b, c].values()",
                errors: [
                    "ES2015 'Array.prototype.values' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = []; foo.values()",
                errors: [
                    "ES2015 'Array.prototype.values' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = Array(); foo.values()",
                errors: [
                    "ES2015 'Array.prototype.values' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends any[]>(a: T) { a.values() }",
                errors: [
                    "ES2015 'Array.prototype.values' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends readonly any[]>(a: T) { a.values() }",
                errors: [
                    "ES2015 'Array.prototype.values' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends string[] | number[]>(a: T) { a.values() }",
                errors: [
                    "ES2015 'Array.prototype.values' method is forbidden.",
                ],
            },
            {
                filename,
                code: "foo.values()",
                errors: [
                    "ES2015 'Array.prototype.values' method is forbidden.",
                ],
                settings: { es: { aggressive: true } },
            },
        ],
    },
)
