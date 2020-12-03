/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-string-prototype-padstart-padend.js")
const ruleId = "no-string-prototype-padstart-padend"

new RuleTester().run(ruleId, rule, {
    valid: [
        "padStart(2)",
        "padEnd(2)",
        "foo.charAt(0)",
        "foo.padStart(2)",
        "foo.padEnd(2)",
        { code: "padStart(2)", settings: { es: { aggressive: true } } },
        { code: "padEnd(2)", settings: { es: { aggressive: true } } },
        { code: "foo.charAt(0)", settings: { es: { aggressive: true } } },
        {
            code: "foo.padStart(2)",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "'foo'.padStart(2)",
            errors: ["ES2017 'String.prototype.padStart' method is forbidden."],
        },
        {
            code: "'foo'.padEnd(2)",
            errors: ["ES2017 'String.prototype.padEnd' method is forbidden."],
        },
        {
            code: "foo.padStart(2)",
            errors: ["ES2017 'String.prototype.padStart' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.padEnd(2)",
            errors: ["ES2017 'String.prototype.padEnd' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.padStart(2)",
            options: [{ aggressive: true }],
            errors: ["ES2017 'String.prototype.padStart' method is forbidden."],
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
        { filename, code: "padStart(2)" },
        { filename, code: "foo.charAt(0)" },
        { filename, code: "foo.padStart(2)" },
        { filename, code: "let foo = {}; foo.padStart(2)" },
        {
            filename,
            code: "padStart(2)",
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.charAt(0)",
            settings: { es: { aggressive: true } },
        },

        // `String` is unknown type if tsconfig.json is not configured.
        { filename, code: "let foo = String(); foo.padStart(2)" },
    ],
    invalid: [
        {
            filename,
            code: "'foo'.padStart(2)",
            errors: ["ES2017 'String.prototype.padStart' method is forbidden."],
        },
        {
            filename,
            code: "'foo'.padEnd(2)",
            errors: ["ES2017 'String.prototype.padEnd' method is forbidden."],
        },
        {
            filename,
            code: "let foo = 'foo'; foo.padStart(2)",
            errors: ["ES2017 'String.prototype.padStart' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends string>(a: T) { a.padStart(2) }",
            errors: ["ES2017 'String.prototype.padStart' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends 'a' | 'b'>(a: T) { a.padStart(2) }",
            errors: ["ES2017 'String.prototype.padStart' method is forbidden."],
        },
        {
            filename,
            code: "let foo = String(); foo.padStart(2)",
            errors: ["ES2017 'String.prototype.padStart' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.padStart(2)",
            errors: ["ES2017 'String.prototype.padStart' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
    ],
})

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Type Information`,
    rule,
    {
        valid: [
            { filename, code: "padStart(2)" },
            { filename, code: "foo.charAt(0)" },
            { filename, code: "foo.padStart(2)" },
            { filename, code: "let foo = {}; foo.padStart(2)" },
            {
                filename,
                code: "padStart(2)",
                settings: { es: { aggressive: true } },
            },
            {
                filename,
                code: "foo.charAt(0)",
                settings: { es: { aggressive: true } },
            },
        ],
        invalid: [
            {
                filename,
                code: "'foo'.padStart(2)",
                errors: [
                    "ES2017 'String.prototype.padStart' method is forbidden.",
                ],
            },
            {
                filename,
                code: "'foo'.padEnd(2)",
                errors: [
                    "ES2017 'String.prototype.padEnd' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = 'foo'; foo.padStart(2)",
                errors: [
                    "ES2017 'String.prototype.padStart' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = String(); foo.padStart(2)",
                errors: [
                    "ES2017 'String.prototype.padStart' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends string>(a: T) { a.padStart(2) }",
                errors: [
                    "ES2017 'String.prototype.padStart' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends 'a' | 'b'>(a: T) { a.padStart(2) }",
                errors: [
                    "ES2017 'String.prototype.padStart' method is forbidden.",
                ],
            },
            {
                filename,
                code: "foo.padStart(2)",
                errors: [
                    "ES2017 'String.prototype.padStart' method is forbidden.",
                ],
                settings: { es: { aggressive: true } },
            },
        ],
    },
)
