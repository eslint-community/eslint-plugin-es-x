/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-string-prototype-startswith.js")
const ruleId = "no-string-prototype-startswith"

new RuleTester().run(ruleId, rule, {
    valid: [
        "startsWith('a')",
        "foo.charAt(0)",
        "foo.startsWith('a')",
        { code: "startsWith('a')", settings: { es: { aggressive: true } } },
        { code: "foo.charAt(0)", settings: { es: { aggressive: true } } },
        {
            code: "foo.startsWith('a')",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "'foo'.startsWith('a')",
            errors: [
                "ES2015 'String.prototype.startsWith' method is forbidden.",
            ],
        },
        {
            code: "foo.startsWith('a')",
            errors: [
                "ES2015 'String.prototype.startsWith' method is forbidden.",
            ],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.startsWith('a')",
            options: [{ aggressive: true }],
            errors: [
                "ES2015 'String.prototype.startsWith' method is forbidden.",
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
        { filename, code: "startsWith('a')" },
        { filename, code: "foo.charAt(0)" },
        { filename, code: "foo.startsWith('a')" },
        { filename, code: "let foo = {}; foo.startsWith('a')" },
        {
            filename,
            code: "startsWith('a')",
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.charAt(0)",
            settings: { es: { aggressive: true } },
        },

        // `String` is unknown type if tsconfig.json is not configured.
        { filename, code: "let foo = String(); foo.startsWith('a')" },
    ],
    invalid: [
        {
            filename,
            code: "'foo'.startsWith('a')",
            errors: [
                "ES2015 'String.prototype.startsWith' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = 'foo'; foo.startsWith('a')",
            errors: [
                "ES2015 'String.prototype.startsWith' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends string>(a: T) { a.startsWith('a') }",
            errors: [
                "ES2015 'String.prototype.startsWith' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends 'a' | 'b'>(a: T) { a.startsWith('a') }",
            errors: [
                "ES2015 'String.prototype.startsWith' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = String(); foo.startsWith('a')",
            errors: [
                "ES2015 'String.prototype.startsWith' method is forbidden.",
            ],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.startsWith('a')",
            errors: [
                "ES2015 'String.prototype.startsWith' method is forbidden.",
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
            { filename, code: "startsWith('a')" },
            { filename, code: "foo.charAt(0)" },
            { filename, code: "foo.startsWith('a')" },
            { filename, code: "let foo = {}; foo.startsWith('a')" },
            {
                filename,
                code: "startsWith('a')",
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
                code: "'foo'.startsWith('a')",
                errors: [
                    "ES2015 'String.prototype.startsWith' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = 'foo'; foo.startsWith('a')",
                errors: [
                    "ES2015 'String.prototype.startsWith' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = String(); foo.startsWith('a')",
                errors: [
                    "ES2015 'String.prototype.startsWith' method is forbidden.",
                ],
            },
            {
                filename,
                code:
                    "function f<T extends string>(a: T) { a.startsWith('a') }",
                errors: [
                    "ES2015 'String.prototype.startsWith' method is forbidden.",
                ],
            },
            {
                filename,
                code:
                    "function f<T extends 'a' | 'b'>(a: T) { a.startsWith('a') }",
                errors: [
                    "ES2015 'String.prototype.startsWith' method is forbidden.",
                ],
            },
            {
                filename,
                code: "foo.startsWith('a')",
                errors: [
                    "ES2015 'String.prototype.startsWith' method is forbidden.",
                ],
                settings: { es: { aggressive: true } },
            },
        ],
    },
)
