/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-foreach.js")
const ruleId = "no-array-prototype-foreach"

new RuleTester().run(ruleId, rule, {
    valid: [
        "forEach(() => {})",
        "foo.reverse()",
        "foo.forEach(() => {})",
        { code: "forEach(() => {})", settings: { es: { aggressive: true } } },
        { code: "foo.reverse()", settings: { es: { aggressive: true } } },
        {
            code: "foo.forEach(() => {})",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.forEach(() => {})",
            errors: ["ES5 'Array.prototype.forEach' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.forEach(() => {})",
            options: [{ aggressive: true }],
            errors: ["ES5 'Array.prototype.forEach' method is forbidden."],
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
        { filename, code: "forEach(() => {})" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.forEach(() => {})" },
        { filename, code: "let foo = {}; foo.forEach(() => {})" },
        {
            filename,
            code: "forEach(() => {})",
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.reverse()",
            settings: { es: { aggressive: true } },
        },

        // `Array` is unknown type if tsconfig.json is not configured.
        { filename, code: "let foo = []; foo.forEach(() => {})" },
        { filename, code: "let foo = Array(); foo.forEach(() => {})" },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.forEach(() => {}) }",
        },
        {
            filename,
            code:
                "function f<T extends string[] | number[]>(a: T) { a.forEach(() => {}) }",
        },
    ],
    invalid: [
        {
            filename,
            code: "[a, b, c].forEach(() => {})",
            errors: ["ES5 'Array.prototype.forEach' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.forEach(() => {})",
            errors: ["ES5 'Array.prototype.forEach' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "let foo = Array(); foo.forEach(() => {})",
            errors: ["ES5 'Array.prototype.forEach' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.forEach(() => {}) }",
            errors: ["ES5 'Array.prototype.forEach' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code:
                "function f<T extends string[] | number[]>(a: T) { a.forEach(() => {}) }",
            errors: ["ES5 'Array.prototype.forEach' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.forEach(() => {})",
            errors: ["ES5 'Array.prototype.forEach' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
    ],
})

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Type Information`,
    rule,
    {
        valid: [
            { filename, code: "forEach(() => {})" },
            { filename, code: "foo.reverse()" },
            { filename, code: "foo.forEach(() => {})" },
            { filename, code: "let foo = {}; foo.forEach(() => {})" },
            {
                filename,
                code: "forEach(() => {})",
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
                code: "[a, b, c].forEach(() => {})",
                errors: ["ES5 'Array.prototype.forEach' method is forbidden."],
            },
            {
                filename,
                code: "let foo = []; foo.forEach(() => {})",
                errors: ["ES5 'Array.prototype.forEach' method is forbidden."],
            },
            {
                filename,
                code: "let foo = Array(); foo.forEach(() => {})",
                errors: ["ES5 'Array.prototype.forEach' method is forbidden."],
            },
            {
                filename,
                code:
                    "function f<T extends any[]>(a: T) { a.forEach(() => {}) }",
                errors: ["ES5 'Array.prototype.forEach' method is forbidden."],
            },
            {
                filename,
                code:
                    "function f<T extends readonly any[]>(a: T) { a.forEach(() => {}) }",
                errors: ["ES5 'Array.prototype.forEach' method is forbidden."],
            },
            {
                filename,
                code:
                    "function f<T extends string[] | number[]>(a: T) { a.forEach(() => {}) }",
                errors: ["ES5 'Array.prototype.forEach' method is forbidden."],
            },
            {
                filename,
                code: "foo.forEach(() => {})",
                errors: ["ES5 'Array.prototype.forEach' method is forbidden."],
                settings: { es: { aggressive: true } },
            },
        ],
    },
)
