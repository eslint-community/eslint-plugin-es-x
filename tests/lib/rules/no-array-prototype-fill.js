/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-fill.js")
const ruleId = "no-array-prototype-fill"

new RuleTester().run(ruleId, rule, {
    valid: [
        "fill(0)",
        "foo.reverse()",
        "foo.fill(0)",
        { code: "fill(0)", settings: { es: { aggressive: true } } },
        { code: "foo.reverse()", settings: { es: { aggressive: true } } },
        {
            code: "foo.fill(0)",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.fill(0)",
            errors: ["ES2015 'Array.prototype.fill' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.fill(0)",
            options: [{ aggressive: true }],
            errors: ["ES2015 'Array.prototype.fill' method is forbidden."],
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
        { filename, code: "fill(0)" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.fill(0)" },
        { filename, code: "let foo = {}; foo.fill(0)" },
        {
            filename,
            code: "fill(0)",
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.reverse()",
            settings: { es: { aggressive: true } },
        },

        // `Array` is unknown type if tsconfig.json is not configured.
        { filename, code: "let foo = []; foo.fill(0)" },
        { filename, code: "let foo = Array(); foo.fill(0)" },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.fill(0) }",
        },
        {
            filename,
            code:
                "function f<T extends string[] | number[]>(a: T) { a.fill(0) }",
        },
    ],
    invalid: [
        {
            filename,
            code: "[a, b, c].fill(0)",
            errors: ["ES2015 'Array.prototype.fill' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.fill(0)",
            errors: ["ES2015 'Array.prototype.fill' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "let foo = Array(); foo.fill(0)",
            errors: ["ES2015 'Array.prototype.fill' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.fill(0) }",
            errors: ["ES2015 'Array.prototype.fill' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code:
                "function f<T extends string[] | number[]>(a: T) { a.fill(0) }",
            errors: ["ES2015 'Array.prototype.fill' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.fill(0)",
            errors: ["ES2015 'Array.prototype.fill' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
    ],
})

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Type Information`,
    rule,
    {
        valid: [
            { filename, code: "fill(0)" },
            { filename, code: "foo.reverse()" },
            { filename, code: "foo.fill(0)" },
            { filename, code: "let foo = {}; foo.fill(0)" },
            {
                filename,
                code: "fill(0)",
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
                code: "[a, b, c].fill(0)",
                errors: ["ES2015 'Array.prototype.fill' method is forbidden."],
            },
            {
                filename,
                code: "let foo = []; foo.fill(0)",
                errors: ["ES2015 'Array.prototype.fill' method is forbidden."],
            },
            {
                filename,
                code: "let foo = Array(); foo.fill(0)",
                errors: ["ES2015 'Array.prototype.fill' method is forbidden."],
            },
            {
                filename,
                code: "function f<T extends any[]>(a: T) { a.fill(0) }",
                errors: ["ES2015 'Array.prototype.fill' method is forbidden."],
            },
            {
                filename,
                code:
                    "function f<T extends readonly any[]>(a: T) { a.fill(0) }",
                errors: ["ES2015 'Array.prototype.fill' method is forbidden."],
            },
            {
                filename,
                code:
                    "function f<T extends string[] | number[]>(a: T) { a.fill(0) }",
                errors: ["ES2015 'Array.prototype.fill' method is forbidden."],
            },
            {
                filename,
                code: "foo.fill(0)",
                errors: ["ES2015 'Array.prototype.fill' method is forbidden."],
                settings: { es: { aggressive: true } },
            },
        ],
    },
)
