/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-string-prototype-trimstart-trimend.js")
const ruleId = "no-string-prototype-trimstart-trimend"

new RuleTester().run(ruleId, rule, {
    valid: [
        "trimStart(2)",
        "trimEnd(2)",
        "foo.charAt(0)",
        "foo.trimStart(2)",
        "foo.trimEnd(2)",
        { code: "trimStart(2)", settings: { es: { aggressive: true } } },
        { code: "trimEnd(2)", settings: { es: { aggressive: true } } },
        { code: "foo.charAt(0)", settings: { es: { aggressive: true } } },
        {
            code: "foo.trimStart(2)",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
        "'foo'.trimLeft(2)",
        "'foo'.trimRight(2)",
        { code: "foo.trimLeft(2)", settings: { es: { aggressive: true } } },
        { code: "foo.trimRight(2)", settings: { es: { aggressive: true } } },
    ],
    invalid: [
        {
            code: "'foo'.trimStart(2)",
            errors: [
                "ES2019 'String.prototype.trimStart' method is forbidden.",
            ],
        },
        {
            code: "'foo'.trimEnd(2)",
            errors: ["ES2019 'String.prototype.trimEnd' method is forbidden."],
        },
        {
            code: "foo.trimStart(2)",
            errors: [
                "ES2019 'String.prototype.trimStart' method is forbidden.",
            ],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.trimEnd(2)",
            errors: ["ES2019 'String.prototype.trimEnd' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.trimStart(2)",
            options: [{ aggressive: true }],
            errors: [
                "ES2019 'String.prototype.trimStart' method is forbidden.",
            ],
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
        { filename, code: "trimStart(2)" },
        { filename, code: "foo.charAt(0)" },
        { filename, code: "foo.trimStart(2)" },
        { filename, code: "let foo = {}; foo.trimStart(2)" },
        {
            filename,
            code: "trimStart(2)",
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.charAt(0)",
            settings: { es: { aggressive: true } },
        },
        { filename, code: "'foo'.trimLeft(2)" },
        { filename, code: "'foo'.trimRight(2)" },
        {
            filename,
            code: "foo.trimLeft(2)",
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.trimRight(2)",
            settings: { es: { aggressive: true } },
        },

        // `String` is unknown type if tsconfig.json is not configured.
        { filename, code: "let foo = String(); foo.trimStart(2)" },
    ],
    invalid: [
        {
            filename,
            code: "'foo'.trimStart(2)",
            errors: [
                "ES2019 'String.prototype.trimStart' method is forbidden.",
            ],
        },
        {
            filename,
            code: "'foo'.trimEnd(2)",
            errors: ["ES2019 'String.prototype.trimEnd' method is forbidden."],
        },
        {
            filename,
            code: "let foo = 'foo'; foo.trimStart(2)",
            errors: [
                "ES2019 'String.prototype.trimStart' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends string>(a: T) { a.trimStart(2) }",
            errors: [
                "ES2019 'String.prototype.trimStart' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends 'a' | 'b'>(a: T) { a.trimStart(2) }",
            errors: [
                "ES2019 'String.prototype.trimStart' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = String(); foo.trimStart(2)",
            errors: [
                "ES2019 'String.prototype.trimStart' method is forbidden.",
            ],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.trimStart(2)",
            errors: [
                "ES2019 'String.prototype.trimStart' method is forbidden.",
            ],
            settings: { es: { aggressive: true } },
        },
    ],
})

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Type Information`,
    rule,
    {
        valid: [
            { filename, code: "trimStart(2)" },
            { filename, code: "foo.charAt(0)" },
            { filename, code: "foo.trimStart(2)" },
            { filename, code: "let foo = {}; foo.trimStart(2)" },
            {
                filename,
                code: "trimStart(2)",
                settings: { es: { aggressive: true } },
            },
            {
                filename,
                code: "foo.charAt(0)",
                settings: { es: { aggressive: true } },
            },
            { filename, code: "'foo'.trimLeft(2)" },
            { filename, code: "'foo'.trimRight(2)" },
            {
                filename,
                code: "foo.trimLeft(2)",
                settings: { es: { aggressive: true } },
            },
            {
                filename,
                code: "foo.trimRight(2)",
                settings: { es: { aggressive: true } },
            },
        ],
        invalid: [
            {
                filename,
                code: "'foo'.trimStart(2)",
                errors: [
                    "ES2019 'String.prototype.trimStart' method is forbidden.",
                ],
            },
            {
                filename,
                code: "'foo'.trimEnd(2)",
                errors: [
                    "ES2019 'String.prototype.trimEnd' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = 'foo'; foo.trimStart(2)",
                errors: [
                    "ES2019 'String.prototype.trimStart' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = String(); foo.trimStart(2)",
                errors: [
                    "ES2019 'String.prototype.trimStart' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends string>(a: T) { a.trimStart(2) }",
                errors: [
                    "ES2019 'String.prototype.trimStart' method is forbidden.",
                ],
            },
            {
                filename,
                code:
                    "function f<T extends 'a' | 'b'>(a: T) { a.trimStart(2) }",
                errors: [
                    "ES2019 'String.prototype.trimStart' method is forbidden.",
                ],
            },
            {
                filename,
                code: "foo.trimStart(2)",
                errors: [
                    "ES2019 'String.prototype.trimStart' method is forbidden.",
                ],
                settings: { es: { aggressive: true } },
            },
        ],
    },
)
