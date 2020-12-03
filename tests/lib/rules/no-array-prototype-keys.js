/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-keys.js")
const ruleId = "no-array-prototype-keys"

new RuleTester().run(ruleId, rule, {
    valid: [
        "keys()",
        "foo.reverse()",
        "foo.keys()",
        { code: "keys()", settings: { es: { aggressive: true } } },
        { code: "foo.reverse()", settings: { es: { aggressive: true } } },
        {
            code: "foo.keys()",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.keys()",
            errors: ["ES2015 'Array.prototype.keys' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.keys()",
            options: [{ aggressive: true }],
            errors: ["ES2015 'Array.prototype.keys' method is forbidden."],
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
        { filename, code: "keys()" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.keys()" },
        { filename, code: "let foo = {}; foo.keys()" },
        {
            filename,
            code: "keys()",
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.reverse()",
            settings: { es: { aggressive: true } },
        },

        // `Array` is unknown type if tsconfig.json is not configured.
        { filename, code: "let foo = []; foo.keys()" },
        { filename, code: "let foo = Array(); foo.keys()" },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.keys() }",
        },
        {
            filename,
            code:
                "function f<T extends string[] | number[]>(a: T) { a.keys() }",
        },
    ],
    invalid: [
        {
            filename,
            code: "[a, b, c].keys()",
            errors: ["ES2015 'Array.prototype.keys' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.keys()",
            errors: ["ES2015 'Array.prototype.keys' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "let foo = Array(); foo.keys()",
            errors: ["ES2015 'Array.prototype.keys' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.keys() }",
            errors: ["ES2015 'Array.prototype.keys' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code:
                "function f<T extends string[] | number[]>(a: T) { a.keys() }",
            errors: ["ES2015 'Array.prototype.keys' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.keys()",
            errors: ["ES2015 'Array.prototype.keys' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
    ],
})

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Type Information`,
    rule,
    {
        valid: [
            { filename, code: "keys()" },
            { filename, code: "foo.reverse()" },
            { filename, code: "foo.keys()" },
            { filename, code: "let foo = {}; foo.keys()" },
            {
                filename,
                code: "keys()",
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
                code: "[a, b, c].keys()",
                errors: ["ES2015 'Array.prototype.keys' method is forbidden."],
            },
            {
                filename,
                code: "let foo = []; foo.keys()",
                errors: ["ES2015 'Array.prototype.keys' method is forbidden."],
            },
            {
                filename,
                code: "let foo = Array(); foo.keys()",
                errors: ["ES2015 'Array.prototype.keys' method is forbidden."],
            },
            {
                filename,
                code: "function f<T extends any[]>(a: T) { a.keys() }",
                errors: ["ES2015 'Array.prototype.keys' method is forbidden."],
            },
            {
                filename,
                code: "function f<T extends readonly any[]>(a: T) { a.keys() }",
                errors: ["ES2015 'Array.prototype.keys' method is forbidden."],
            },
            {
                filename,
                code:
                    "function f<T extends string[] | number[]>(a: T) { a.keys() }",
                errors: ["ES2015 'Array.prototype.keys' method is forbidden."],
            },
            {
                filename,
                code: "foo.keys()",
                errors: ["ES2015 'Array.prototype.keys' method is forbidden."],
                settings: { es: { aggressive: true } },
            },
        ],
    },
)
