/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-filter.js")
const ruleId = "no-array-prototype-filter"

new RuleTester().run(ruleId, rule, {
    valid: [
        "filter(() => {})",
        "foo.reverse()",
        "foo.filter(() => {})",
        { code: "filter(() => {})", settings: { es: { aggressive: true } } },
        { code: "foo.reverse()", settings: { es: { aggressive: true } } },
        {
            code: "foo.filter(() => {})",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.filter(() => {})",
            errors: ["ES5 'Array.prototype.filter' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.filter(() => {})",
            options: [{ aggressive: true }],
            errors: ["ES5 'Array.prototype.filter' method is forbidden."],
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
        { filename, code: "filter(() => {})" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.filter(() => {})" },
        { filename, code: "let foo = {}; foo.filter(() => {})" },
        {
            filename,
            code: "filter(() => {})",
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.reverse()",
            settings: { es: { aggressive: true } },
        },

        // `Array` is unknown type if tsconfig.json is not configured.
        { filename, code: "let foo = []; foo.filter(() => {})" },
        { filename, code: "let foo = Array(); foo.filter(() => {})" },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.filter(() => {}) }",
        },
        {
            filename,
            code:
                "function f<T extends string[] | number[]>(a: T) { a.filter(() => {}) }",
        },
    ],
    invalid: [
        {
            filename,
            code: "[a, b, c].filter(() => {})",
            errors: ["ES5 'Array.prototype.filter' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.filter(() => {})",
            errors: ["ES5 'Array.prototype.filter' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "let foo = Array(); foo.filter(() => {})",
            errors: ["ES5 'Array.prototype.filter' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.filter(() => {}) }",
            errors: ["ES5 'Array.prototype.filter' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code:
                "function f<T extends string[] | number[]>(a: T) { a.filter(() => {}) }",
            errors: ["ES5 'Array.prototype.filter' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.filter(() => {})",
            errors: ["ES5 'Array.prototype.filter' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
    ],
})

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Type Information`,
    rule,
    {
        valid: [
            { filename, code: "filter(() => {})" },
            { filename, code: "foo.reverse()" },
            { filename, code: "foo.filter(() => {})" },
            { filename, code: "let foo = {}; foo.filter(() => {})" },
            {
                filename,
                code: "filter(() => {})",
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
                code: "[a, b, c].filter(() => {})",
                errors: ["ES5 'Array.prototype.filter' method is forbidden."],
            },
            {
                filename,
                code: "let foo = []; foo.filter(() => {})",
                errors: ["ES5 'Array.prototype.filter' method is forbidden."],
            },
            {
                filename,
                code: "let foo = Array(); foo.filter(() => {})",
                errors: ["ES5 'Array.prototype.filter' method is forbidden."],
            },
            {
                filename,
                code:
                    "function f<T extends any[]>(a: T) { a.filter(() => {}) }",
                errors: ["ES5 'Array.prototype.filter' method is forbidden."],
            },
            {
                filename,
                code:
                    "function f<T extends readonly any[]>(a: T) { a.filter(() => {}) }",
                errors: ["ES5 'Array.prototype.filter' method is forbidden."],
            },
            {
                filename,
                code:
                    "function f<T extends string[] | number[]>(a: T) { a.filter(() => {}) }",
                errors: ["ES5 'Array.prototype.filter' method is forbidden."],
            },
            {
                filename,
                code: "foo.filter(() => {})",
                errors: ["ES5 'Array.prototype.filter' method is forbidden."],
                settings: { es: { aggressive: true } },
            },
        ],
    },
)
