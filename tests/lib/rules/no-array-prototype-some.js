/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-some.js")
const ruleId = "no-array-prototype-some"

new RuleTester().run(ruleId, rule, {
    valid: [
        "some(() => {})",
        "foo.reverse()",
        "foo.some(() => {})",
        { code: "some(() => {})", settings: { es: { aggressive: true } } },
        { code: "foo.reverse()", settings: { es: { aggressive: true } } },
        {
            code: "foo.some(() => {})",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.some(() => {})",
            errors: ["ES5 'Array.prototype.some' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.some(() => {})",
            options: [{ aggressive: true }],
            errors: ["ES5 'Array.prototype.some' method is forbidden."],
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
        { filename, code: "some(() => {})" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.some(() => {})" },
        { filename, code: "let foo = {}; foo.some(() => {})" },
        {
            filename,
            code: "some(() => {})",
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.reverse()",
            settings: { es: { aggressive: true } },
        },

        // `Array` is unknown type if tsconfig.json is not configured.
        { filename, code: "let foo = []; foo.some(() => {})" },
        { filename, code: "let foo = Array(); foo.some(() => {})" },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.some(() => {}) }",
        },
        {
            filename,
            code:
                "function f<T extends string[] | number[]>(a: T) { a.some(() => {}) }",
        },
    ],
    invalid: [
        {
            filename,
            code: "[a, b, c].some(() => {})",
            errors: ["ES5 'Array.prototype.some' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.some(() => {})",
            errors: ["ES5 'Array.prototype.some' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "let foo = Array(); foo.some(() => {})",
            errors: ["ES5 'Array.prototype.some' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.some(() => {}) }",
            errors: ["ES5 'Array.prototype.some' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code:
                "function f<T extends string[] | number[]>(a: T) { a.some(() => {}) }",
            errors: ["ES5 'Array.prototype.some' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.some(() => {})",
            errors: ["ES5 'Array.prototype.some' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
    ],
})

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Type Information`,
    rule,
    {
        valid: [
            { filename, code: "some(() => {})" },
            { filename, code: "foo.reverse()" },
            { filename, code: "foo.some(() => {})" },
            { filename, code: "let foo = {}; foo.some(() => {})" },
            {
                filename,
                code: "some(() => {})",
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
                code: "[a, b, c].some(() => {})",
                errors: ["ES5 'Array.prototype.some' method is forbidden."],
            },
            {
                filename,
                code: "let foo = []; foo.some(() => {})",
                errors: ["ES5 'Array.prototype.some' method is forbidden."],
            },
            {
                filename,
                code: "let foo = Array(); foo.some(() => {})",
                errors: ["ES5 'Array.prototype.some' method is forbidden."],
            },
            {
                filename,
                code: "function f<T extends any[]>(a: T) { a.some(() => {}) }",
                errors: ["ES5 'Array.prototype.some' method is forbidden."],
            },
            {
                filename,
                code:
                    "function f<T extends readonly any[]>(a: T) { a.some(() => {}) }",
                errors: ["ES5 'Array.prototype.some' method is forbidden."],
            },
            {
                filename,
                code:
                    "function f<T extends string[] | number[]>(a: T) { a.some(() => {}) }",
                errors: ["ES5 'Array.prototype.some' method is forbidden."],
            },
            {
                filename,
                code: "foo.some(() => {})",
                errors: ["ES5 'Array.prototype.some' method is forbidden."],
                settings: { es: { aggressive: true } },
            },
        ],
    },
)
