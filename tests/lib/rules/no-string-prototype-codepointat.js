/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-string-prototype-codepointat.js")
const ruleId = "no-string-prototype-codepointat"

new RuleTester().run(ruleId, rule, {
    valid: [
        "codePointAt(0)",
        "foo.charAt(0)",
        "foo.codePointAt(0)",
        { code: "codePointAt(0)", settings: { es: { aggressive: true } } },
        { code: "foo.charAt(0)", settings: { es: { aggressive: true } } },
        {
            code: "foo.codePointAt(0)",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.codePointAt(0)",
            errors: [
                "ES2015 'String.prototype.codePointAt' method is forbidden.",
            ],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.codePointAt(0)",
            options: [{ aggressive: true }],
            errors: [
                "ES2015 'String.prototype.codePointAt' method is forbidden.",
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
        "codePointAt(0)",
        "foo.charAt(0)",
        "foo.codePointAt(0)",
        "let foo = {}; foo.codePointAt(0)",
        {
            code: "codePointAt(0)",
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.charAt(0)",
            settings: { es: { aggressive: true } },
        },

        // `String` is unknown type if tsconfig.json is not configured.
        "let foo = String(); foo.codePointAt(0)",
    ],
    invalid: [
        {
            code: "let foo = ''; foo.codePointAt(0)",
            errors: [
                "ES2015 'String.prototype.codePointAt' method is forbidden.",
            ],
        },
        {
            code: "function f<T extends string>(a: T) { a.codePointAt(0) }",
            errors: [
                "ES2015 'String.prototype.codePointAt' method is forbidden.",
            ],
        },
        {
            code: "function f<T extends 'a' | 'b'>(a: T) { a.codePointAt(0) }",
            errors: [
                "ES2015 'String.prototype.codePointAt' method is forbidden.",
            ],
        },
        {
            code: "let foo = String(); foo.codePointAt(0)",
            errors: [
                "ES2015 'String.prototype.codePointAt' method is forbidden.",
            ],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.codePointAt(0)",
            errors: [
                "ES2015 'String.prototype.codePointAt' method is forbidden.",
            ],
            settings: { es: { aggressive: true } },
        },
    ],
})

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Types`,
    rule,
    {
        valid: [
            { filename, code: "codePointAt(0)" },
            { filename, code: "foo.charAt(0)" },
            { filename, code: "foo.codePointAt(0)" },
            { filename, code: "let foo = {}; foo.codePointAt(0)" },
            {
                filename,
                code: "codePointAt(0)",
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
                code: "let foo = ''; foo.codePointAt(0)",
                errors: [
                    "ES2015 'String.prototype.codePointAt' method is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = String(); foo.codePointAt(0)",
                errors: [
                    "ES2015 'String.prototype.codePointAt' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends string>(a: T) { a.codePointAt(0) }",
                errors: [
                    "ES2015 'String.prototype.codePointAt' method is forbidden.",
                ],
            },
            {
                filename,
                code:
                    "function f<T extends 'a' | 'b'>(a: T) { a.codePointAt(0) }",
                errors: [
                    "ES2015 'String.prototype.codePointAt' method is forbidden.",
                ],
            },
            {
                filename,
                code: "foo.codePointAt(0)",
                errors: [
                    "ES2015 'String.prototype.codePointAt' method is forbidden.",
                ],
                settings: { es: { aggressive: true } },
            },
        ],
    },
)
