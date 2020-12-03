/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-string-prototype-repeat.js")
const ruleId = "no-string-prototype-repeat"

new RuleTester().run(ruleId, rule, {
    valid: [
        "repeat(3)",
        "foo.charAt(0)",
        "foo.repeat(3)",
        { code: "repeat(3)", settings: { es: { aggressive: true } } },
        { code: "foo.charAt(0)", settings: { es: { aggressive: true } } },
        {
            code: "foo.repeat(3)",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "'foo'.repeat(3)",
            errors: ["ES2015 'String.prototype.repeat' method is forbidden."],
        },
        {
            code: "foo.repeat(3)",
            errors: ["ES2015 'String.prototype.repeat' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.repeat(3)",
            options: [{ aggressive: true }],
            errors: ["ES2015 'String.prototype.repeat' method is forbidden."],
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
        { filename, code: "repeat(3)" },
        { filename, code: "foo.charAt(0)" },
        { filename, code: "foo.repeat(3)" },
        { filename, code: "let foo = {}; foo.repeat(3)" },
        {
            filename,
            code: "repeat(3)",
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.charAt(0)",
            settings: { es: { aggressive: true } },
        },

        // `String` is unknown type if tsconfig.json is not configured.
        { filename, code: "let foo = String(); foo.repeat(3)" },
    ],
    invalid: [
        {
            filename,
            code: "'foo'.repeat(3)",
            errors: ["ES2015 'String.prototype.repeat' method is forbidden."],
        },
        {
            filename,
            code: "let foo = 'foo'; foo.repeat(3)",
            errors: ["ES2015 'String.prototype.repeat' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends string>(a: T) { a.repeat(3) }",
            errors: ["ES2015 'String.prototype.repeat' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends 'a' | 'b'>(a: T) { a.repeat(3) }",
            errors: ["ES2015 'String.prototype.repeat' method is forbidden."],
        },
        {
            filename,
            code: "let foo = String(); foo.repeat(3)",
            errors: ["ES2015 'String.prototype.repeat' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.repeat(3)",
            errors: ["ES2015 'String.prototype.repeat' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
    ],
})

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Type Information`,
    rule,
    {
        valid: [
            { filename, code: "repeat(3)" },
            { filename, code: "foo.charAt(0)" },
            { filename, code: "foo.repeat(3)" },
            { filename, code: "let foo = {}; foo.repeat(3)" },
            {
                filename,
                code: "repeat(3)",
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
                code: "'foo'.repeat(3)",
                errors: [
                    "ES2015 'String.prototype.repeat' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = 'foo'; foo.repeat(3)",
                errors: [
                    "ES2015 'String.prototype.repeat' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = String(); foo.repeat(3)",
                errors: [
                    "ES2015 'String.prototype.repeat' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends string>(a: T) { a.repeat(3) }",
                errors: [
                    "ES2015 'String.prototype.repeat' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends 'a' | 'b'>(a: T) { a.repeat(3) }",
                errors: [
                    "ES2015 'String.prototype.repeat' method is forbidden.",
                ],
            },
            {
                filename,
                code: "foo.repeat(3)",
                errors: [
                    "ES2015 'String.prototype.repeat' method is forbidden.",
                ],
                settings: { es: { aggressive: true } },
            },
        ],
    },
)
