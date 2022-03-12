/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-string-prototype-at.js")
const ruleId = "no-array-string-prototype-at"

new RuleTester().run(ruleId, rule, {
    valid: [
        "at(-1)",
        "foo.reverse()",
        "foo.at(-1)",
        { code: "at(-1)", settings: { es: { aggressive: true } } },
        { code: "foo.reverse()", settings: { es: { aggressive: true } } },
        {
            code: "foo.at(-1)",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.at(-1)",
            errors: ["ES2022 'Array.prototype.at' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.at(-1)",
            options: [{ aggressive: true }],
            errors: ["ES2022 'Array.prototype.at' method is forbidden."],
            settings: { es: { aggressive: false } },
        },
        {
            code: "[1,2,3].at(-1)",
            errors: ["ES2022 'Array.prototype.at' method is forbidden."],
        },
        {
            code: "'123'.at(-1)",
            errors: ["ES2022 'String.prototype.at' method is forbidden."],
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
        { filename, code: "at(-1)" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.at(-1)" },
        { filename, code: "let foo = {}; foo.at(-1)" },
        {
            filename,
            code: "at(-1)",
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.reverse()",
            settings: { es: { aggressive: true } },
        },

        // `Array` is unknown type if tsconfig.json is not configured.
        { filename, code: "let foo = []; foo.at(-1)" },
        { filename, code: "let foo = Array(); foo.at(-1)" },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.at(-1) }",
        },
        {
            filename,
            code:
                "function f<T extends string[] | number[]>(a: T) { a.at(-1) }",
        },
    ],
    invalid: [
        {
            filename,
            code: "[1, 2, 3].at(-1)",
            errors: ["ES2022 'Array.prototype.at' method is forbidden."],
        },
        {
            filename,
            code: "'123'.at(-1)",
            errors: ["ES2022 'String.prototype.at' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.at(-1)",
            errors: ["ES2022 'Array.prototype.at' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "let foo = Array(); foo.at(-1)",
            errors: ["ES2022 'Array.prototype.at' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.at(-1) }",
            errors: ["ES2022 'Array.prototype.at' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code:
                "function f<T extends string[] | number[]>(a: T) { a.at(-1) }",
            errors: ["ES2022 'Array.prototype.at' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.at(-1)",
            errors: ["ES2022 'Array.prototype.at' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
    ],
})

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Type Information`,
    rule,
    {
        valid: [
            { filename, code: "at(-1)" },
            { filename, code: "foo.reverse()" },
            { filename, code: "foo.at(-1)" },
            { filename, code: "let foo = {}; foo.at(-1)" },
            {
                filename,
                code: "at(-1)",
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
                code: "[1, 2, 3].at(-1)",
                errors: ["ES2022 'Array.prototype.at' method is forbidden."],
            },
            {
                filename,
                code: "'123'.at(-1)",
                errors: ["ES2022 'String.prototype.at' method is forbidden."],
            },
            {
                filename,
                code: "let foo = []; foo.at(-1)",
                errors: ["ES2022 'Array.prototype.at' method is forbidden."],
            },
            {
                filename,
                code: "let foo = Array(); foo.at(-1)",
                errors: ["ES2022 'Array.prototype.at' method is forbidden."],
            },
            {
                filename,
                code: "function f<T extends any[]>(a: T) { a.at(-1) }",
                errors: ["ES2022 'Array.prototype.at' method is forbidden."],
            },
            {
                filename,
                code: "function f<T extends readonly any[]>(a: T) { a.at(-1) }",
                errors: ["ES2022 'Array.prototype.at' method is forbidden."],
            },
            {
                filename,
                code:
                    "function f<T extends string[] | number[]>(a: T) { a.at(-1) }",
                errors: ["ES2022 'Array.prototype.at' method is forbidden."],
            },
            {
                filename,
                code: "foo.at(-1)",
                errors: ["ES2022 'Array.prototype.at' method is forbidden."],
                settings: { es: { aggressive: true } },
            },
            {
                filename,
                code: "let foo = 'str'; foo.at(-1)",
                errors: ["ES2022 'String.prototype.at' method is forbidden."],
            },
            {
                filename,
                code: "let foo = String(42); foo.at(-1)",
                errors: ["ES2022 'String.prototype.at' method is forbidden."],
            },
            {
                filename,
                code: "function f<T extends string>(a: T) { a.at(-1) }",
                errors: ["ES2022 'String.prototype.at' method is forbidden."],
            },
            {
                filename,
                code: "function f<T extends 'a' | 'b'>(a: T) { a.at(-1) }",
                errors: ["ES2022 'String.prototype.at' method is forbidden."],
            },
            {
                filename,
                code:
                    "function f<T extends 'a' | 'b' | 'c'>(a: T) { a.at(-1) }",
                errors: ["ES2022 'String.prototype.at' method is forbidden."],
            },
            {
                filename,
                code: "let foo = new Int8Array(42); foo.at(-1)",
                errors: [
                    "ES2022 'Int8Array.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends Int8Array>(a: T) { a.at(-1) }",
                errors: [
                    "ES2022 'Int8Array.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = new Uint8Array(42); foo.at(-1)",
                errors: [
                    "ES2022 'Uint8Array.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends Uint8Array>(a: T) { a.at(-1) }",
                errors: [
                    "ES2022 'Uint8Array.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = new Uint8ClampedArray(42); foo.at(-1)",
                errors: [
                    "ES2022 'Uint8ClampedArray.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code:
                    "function f<T extends Uint8ClampedArray>(a: T) { a.at(-1) }",
                errors: [
                    "ES2022 'Uint8ClampedArray.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = new Int16Array(42); foo.at(-1)",
                errors: [
                    "ES2022 'Int16Array.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends Int16Array>(a: T) { a.at(-1) }",
                errors: [
                    "ES2022 'Int16Array.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = new Uint16Array(42); foo.at(-1)",
                errors: [
                    "ES2022 'Uint16Array.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends Uint16Array>(a: T) { a.at(-1) }",
                errors: [
                    "ES2022 'Uint16Array.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = new Int32Array(42); foo.at(-1)",
                errors: [
                    "ES2022 'Int32Array.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends Int32Array>(a: T) { a.at(-1) }",
                errors: [
                    "ES2022 'Int32Array.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = new Uint32Array(42); foo.at(-1)",
                errors: [
                    "ES2022 'Uint32Array.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends Uint32Array>(a: T) { a.at(-1) }",
                errors: [
                    "ES2022 'Uint32Array.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = new Float32Array(42); foo.at(-1)",
                errors: [
                    "ES2022 'Float32Array.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends Float32Array>(a: T) { a.at(-1) }",
                errors: [
                    "ES2022 'Float32Array.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = new Float64Array(42); foo.at(-1)",
                errors: [
                    "ES2022 'Float64Array.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends Float64Array>(a: T) { a.at(-1) }",
                errors: [
                    "ES2022 'Float64Array.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = new BigInt64Array(42); foo.at(-1)",
                errors: [
                    "ES2022 'BigInt64Array.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends BigInt64Array>(a: T) { a.at(-1) }",
                errors: [
                    "ES2022 'BigInt64Array.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = new BigUint64Array(42); foo.at(-1)",
                errors: [
                    "ES2022 'BigUint64Array.prototype.at' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends BigUint64Array>(a: T) { a.at(-1) }",
                errors: [
                    "ES2022 'BigUint64Array.prototype.at' method is forbidden.",
                ],
            },
        ],
    },
)
