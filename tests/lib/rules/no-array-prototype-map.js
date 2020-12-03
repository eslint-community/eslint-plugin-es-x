/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-map.js")
const ruleId = "no-array-prototype-map"

new RuleTester().run(ruleId, rule, {
    valid: [
        "map(() => {})",
        "foo.reverse()",
        "foo.map(() => {})",
        { code: "map(() => {})", settings: { es: { aggressive: true } } },
        { code: "foo.reverse()", settings: { es: { aggressive: true } } },
        {
            code: "foo.map(() => {})",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.map(() => {})",
            errors: ["ES5 'Array.prototype.map' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.map(() => {})",
            options: [{ aggressive: true }],
            errors: ["ES5 'Array.prototype.map' method is forbidden."],
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
        { filename, code: "map(() => {})" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.map(() => {})" },
        { filename, code: "let foo = {}; foo.map(() => {})" },
        {
            filename,
            code: "map(() => {})",
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.reverse()",
            settings: { es: { aggressive: true } },
        },

        // `Array` is unknown type if tsconfig.json is not configured.
        { filename, code: "let foo = []; foo.map(() => {})" },
        { filename, code: "let foo = Array(); foo.map(() => {})" },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.map(() => {}) }",
        },
        {
            filename,
            code:
                "function f<T extends string[] | number[]>(a: T) { a.map(() => {}) }",
        },
    ],
    invalid: [
        {
            filename,
            code: "[a, b, c].map(() => {})",
            errors: ["ES5 'Array.prototype.map' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.map(() => {})",
            errors: ["ES5 'Array.prototype.map' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "let foo = Array(); foo.map(() => {})",
            errors: ["ES5 'Array.prototype.map' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.map(() => {}) }",
            errors: ["ES5 'Array.prototype.map' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code:
                "function f<T extends string[] | number[]>(a: T) { a.map(() => {}) }",
            errors: ["ES5 'Array.prototype.map' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.map(() => {})",
            errors: ["ES5 'Array.prototype.map' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
    ],
})

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Type Information`,
    rule,
    {
        valid: [
            { filename, code: "map(() => {})" },
            { filename, code: "foo.reverse()" },
            { filename, code: "foo.map(() => {})" },
            { filename, code: "let foo = {}; foo.map(() => {})" },
            {
                filename,
                code: "map(() => {})",
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
                code: "[a, b, c].map(() => {})",
                errors: ["ES5 'Array.prototype.map' method is forbidden."],
            },
            {
                filename,
                code: "let foo = []; foo.map(() => {})",
                errors: ["ES5 'Array.prototype.map' method is forbidden."],
            },
            {
                filename,
                code: "let foo = Array(); foo.map(() => {})",
                errors: ["ES5 'Array.prototype.map' method is forbidden."],
            },
            {
                filename,
                code: "function f<T extends any[]>(a: T) { a.map(() => {}) }",
                errors: ["ES5 'Array.prototype.map' method is forbidden."],
            },
            {
                filename,
                code:
                    "function f<T extends readonly any[]>(a: T) { a.map(() => {}) }",
                errors: ["ES5 'Array.prototype.map' method is forbidden."],
            },
            {
                filename,
                code:
                    "function f<T extends string[] | number[]>(a: T) { a.map(() => {}) }",
                errors: ["ES5 'Array.prototype.map' method is forbidden."],
            },
            {
                filename,
                code: "foo.map(() => {})",
                errors: ["ES5 'Array.prototype.map' method is forbidden."],
                settings: { es: { aggressive: true } },
            },
        ],
    },
)
