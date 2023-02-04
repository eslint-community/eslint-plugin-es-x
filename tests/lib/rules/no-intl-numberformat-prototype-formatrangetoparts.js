"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-intl-numberformat-prototype-formatrangetoparts.js")
const ruleId = "no-intl-numberformat-prototype-formatrangetoparts"

new RuleTester().run(ruleId, rule, {
    valid: [
        "formatRangeToParts(2.9, 3.1)",
        "foo.unknown(0)",
        "foo.formatRangeToParts(2.9, 3.1)",
        {
            code: "formatRangeToParts(2.9, 3.1)",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.unknown(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.formatRangeToParts(2.9, 3.1)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.formatRangeToParts(2.9, 3.1)",
            errors: [
                "ES2023 Intl API 'Intl.NumberFormat.prototype.formatRangeToParts' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.formatRangeToParts(2.9, 3.1)",
            options: [{ aggressive: true }],
            errors: [
                "ES2023 Intl API 'Intl.NumberFormat.prototype.formatRangeToParts' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: false } },
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
        { filename, code: "formatRangeToParts(2.9, 3.1)" },
        { filename, code: "foo.unknown(0)" },
        { filename, code: "foo.formatRangeToParts(2.9, 3.1)" },
        { filename, code: "let foo = {}; foo.formatRangeToParts(2.9, 3.1)" },
        {
            filename,
            code: "formatRangeToParts(2.9, 3.1)",
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.unknown(0)",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: "let foo = new Unknown(); foo.formatRangeToParts(2.9, 3.1)",
            errors: [
                "ES2023 Intl API 'Intl.NumberFormat.prototype.formatRangeToParts' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.formatRangeToParts(2.9, 3.1)",
            errors: [
                "ES2023 Intl API 'Intl.NumberFormat.prototype.formatRangeToParts' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Type Information`,
    rule,
    {
        valid: [
            { filename, code: "formatRangeToParts(2.9, 3.1)" },
            { filename, code: "foo.unknown(0)" },
            { filename, code: "foo.formatRangeToParts(2.9, 3.1)" },
            {
                filename,
                code: "let foo = {}; foo.formatRangeToParts(2.9, 3.1)",
            },
            {
                filename,
                code: "formatRangeToParts(2.9, 3.1)",
                settings: { "es-x": { aggressive: true } },
            },
            {
                filename,
                code: "foo.unknown(0)",
                settings: { "es-x": { aggressive: true } },
            },
        ],
        invalid: [
            {
                filename,
                code: "let foo = new Intl.NumberFormat(); foo.formatRangeToParts(2.9, 3.1)",
                errors: [
                    "ES2023 Intl API 'Intl.NumberFormat.prototype.formatRangeToParts' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f(a: Intl.NumberFormat) { a.formatRangeToParts(2.9, 3.1) }",
                errors: [
                    "ES2023 Intl API 'Intl.NumberFormat.prototype.formatRangeToParts' method is forbidden.",
                ],
            },
            {
                filename,
                code: "foo.formatRangeToParts(2.9, 3.1)",
                errors: [
                    "ES2023 Intl API 'Intl.NumberFormat.prototype.formatRangeToParts' method is forbidden.",
                ],
                settings: { "es-x": { aggressive: true } },
            },
        ],
    },
)
