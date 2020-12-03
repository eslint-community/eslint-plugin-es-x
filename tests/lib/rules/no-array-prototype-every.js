/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-every.js")
const ruleId = "no-array-prototype-every"

new RuleTester().run(ruleId, rule, {
    valid: [
        "every(() => {})",
        "foo.reverse()",
        "foo.every(() => {})",
        { code: "every(() => {})", settings: { es: { aggressive: true } } },
        { code: "foo.reverse()", settings: { es: { aggressive: true } } },
        {
            code: "foo.every(() => {})",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.every(() => {})",
            errors: ["ES5 'Array.prototype.every' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.every(() => {})",
            options: [{ aggressive: true }],
            errors: ["ES5 'Array.prototype.every' method is forbidden."],
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
        { filename, code: "every(() => {})" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.every(() => {})" },
        { filename, code: "let foo = {}; foo.every(() => {})" },
        {
            filename,
            code: "every(() => {})",
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.reverse()",
            settings: { es: { aggressive: true } },
        },

        // `Array` is unknown type if tsconfig.json is not configured.
        { filename, code: "let foo = []; foo.every(() => {})" },
        { filename, code: "let foo = Array(); foo.every(() => {})" },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.every(() => {}) }",
        },
        {
            filename,
            code:
                "function f<T extends string[] | number[]>(a: T) { a.every(() => {}) }",
        },
    ],
    invalid: [
        {
            filename,
            code: "[a, b, c].every(() => {})",
            errors: ["ES5 'Array.prototype.every' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.every(() => {})",
            errors: ["ES5 'Array.prototype.every' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "let foo = Array(); foo.every(() => {})",
            errors: ["ES5 'Array.prototype.every' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.every(() => {}) }",
            errors: ["ES5 'Array.prototype.every' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code:
                "function f<T extends string[] | number[]>(a: T) { a.every(() => {}) }",
            errors: ["ES5 'Array.prototype.every' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.every(() => {})",
            errors: ["ES5 'Array.prototype.every' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
    ],
})

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Type Information`,
    rule,
    {
        valid: [
            { filename, code: "every(() => {})" },
            { filename, code: "foo.reverse()" },
            { filename, code: "foo.every(() => {})" },
            { filename, code: "let foo = {}; foo.every(() => {})" },
            {
                filename,
                code: "every(() => {})",
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
                code: "[a, b, c].every(() => {})",
                errors: ["ES5 'Array.prototype.every' method is forbidden."],
            },
            {
                filename,
                code: "let foo = []; foo.every(() => {})",
                errors: ["ES5 'Array.prototype.every' method is forbidden."],
            },
            {
                filename,
                code: "let foo = Array(); foo.every(() => {})",
                errors: ["ES5 'Array.prototype.every' method is forbidden."],
            },
            {
                filename,
                code: "function f<T extends any[]>(a: T) { a.every(() => {}) }",
                errors: ["ES5 'Array.prototype.every' method is forbidden."],
            },
            {
                filename,
                code:
                    "function f<T extends readonly any[]>(a: T) { a.every(() => {}) }",
                errors: ["ES5 'Array.prototype.every' method is forbidden."],
            },
            {
                filename,
                code:
                    "function f<T extends string[] | number[]>(a: T) { a.every(() => {}) }",
                errors: ["ES5 'Array.prototype.every' method is forbidden."],
            },
            {
                filename,
                code: "foo.every(() => {})",
                errors: ["ES5 'Array.prototype.every' method is forbidden."],
                settings: { es: { aggressive: true } },
            },
        ],
    },
)
