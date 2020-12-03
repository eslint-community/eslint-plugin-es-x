/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-includes.js")
const ruleId = "no-array-prototype-includes"

new RuleTester().run(ruleId, rule, {
    valid: [
        "includes(0)",
        "foo.reverse()",
        "foo.includes(0)",
        { code: "includes(0)", settings: { es: { aggressive: true } } },
        {
            code: "'foo'.includes(0)",
            settings: { es: { aggressive: true } },
        },
        {
            code: "`foo`.includes(0)",
            settings: { es: { aggressive: true } },
        },
        { code: "foo.reverse()", settings: { es: { aggressive: true } } },
        {
            code: "foo.includes(0)",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.includes(0)",
            errors: ["ES2016 'Array.prototype.includes' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.includes(0)",
            options: [{ aggressive: true }],
            errors: ["ES2016 'Array.prototype.includes' method is forbidden."],
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
        { filename, code: "includes(0)" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.includes(0)" },
        { filename, code: "let foo = {}; foo.includes(0)" },
        {
            filename,
            code: "includes(0)",
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.reverse()",
            settings: { es: { aggressive: true } },
        },
        {
            code: "'foo'.includes(0)",
            settings: { es: { aggressive: true } },
        },
        {
            code: "`foo`.includes(0)",
            settings: { es: { aggressive: true } },
        },

        // `Array` is unknown type if tsconfig.json is not configured.
        { filename, code: "let foo = []; foo.includes(0)" },
        { filename, code: "let foo = Array(); foo.includes(0)" },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.includes(0) }",
        },
        {
            filename,
            code:
                "function f<T extends string[] | number[]>(a: T) { a.includes(0) }",
        },
    ],
    invalid: [
        {
            filename,
            code: "[a, b, c].includes(0)",
            errors: ["ES2016 'Array.prototype.includes' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.includes(0)",
            errors: ["ES2016 'Array.prototype.includes' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "let foo = Array(); foo.includes(0)",
            errors: ["ES2016 'Array.prototype.includes' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.includes(0) }",
            errors: ["ES2016 'Array.prototype.includes' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code:
                "function f<T extends string[] | number[]>(a: T) { a.includes(0) }",
            errors: ["ES2016 'Array.prototype.includes' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.includes(0)",
            errors: ["ES2016 'Array.prototype.includes' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
    ],
})

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Type Information`,
    rule,
    {
        valid: [
            { filename, code: "includes(0)" },
            { filename, code: "foo.reverse()" },
            { filename, code: "foo.includes(0)" },
            { filename, code: "let foo = {}; foo.includes(0)" },
            {
                filename,
                code: "includes(0)",
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
                code: "[a, b, c].includes(0)",
                errors: [
                    "ES2016 'Array.prototype.includes' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = []; foo.includes(0)",
                errors: [
                    "ES2016 'Array.prototype.includes' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = Array(); foo.includes(0)",
                errors: [
                    "ES2016 'Array.prototype.includes' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends any[]>(a: T) { a.includes(0) }",
                errors: [
                    "ES2016 'Array.prototype.includes' method is forbidden.",
                ],
            },
            {
                filename,
                code:
                    "function f<T extends readonly any[]>(a: T) { a.includes(0) }",
                errors: [
                    "ES2016 'Array.prototype.includes' method is forbidden.",
                ],
            },
            {
                filename,
                code:
                    "function f<T extends string[] | number[]>(a: T) { a.includes(0) }",
                errors: [
                    "ES2016 'Array.prototype.includes' method is forbidden.",
                ],
            },
            ...[
                "Int8Array",
                "Uint8Array",
                "Uint8ClampedArray",
                "Int16Array",
                "Uint16Array",
                "Int32Array",
                "Uint32Array",
                "Float32Array",
                "Float64Array",
                "BigInt64Array",
                "BigUint64Array",
            ].map(className => ({
                filename,
                code: `let foo = new ${className}(10); foo.includes(0)`,
                errors: [
                    `ES2016 '${className}.prototype.includes' method is forbidden.`,
                ],
            })),
            {
                filename,
                code: "foo.includes(0)",
                errors: [
                    "ES2016 'Array.prototype.includes' method is forbidden.",
                ],
                settings: { es: { aggressive: true } },
            },
        ],
    },
)
