"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-intl-numberformat-prototype-formattoparts.js")
const ruleId = "no-intl-numberformat-prototype-formattoparts"

new RuleTester().run(ruleId, rule, {
    valid: [
        "formatToParts(num)",
        "foo.unknown(0)",
        "foo.formatToParts(num)",
        {
            code: "formatToParts(num)",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.unknown(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.formatToParts(num)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.formatToParts(num)",
            errors: [
                "ES2018 Intl API 'Intl.NumberFormat.prototype.formatToParts' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.formatToParts(num)",
            options: [{ aggressive: true }],
            errors: [
                "ES2018 Intl API 'Intl.NumberFormat.prototype.formatToParts' method is forbidden.",
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

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Type Information`,
    rule,
    {
        valid: [
            { filename, code: "formatToParts(num)" },
            { filename, code: "foo.unknown(0)" },
            { filename, code: "foo.formatToParts(num)" },
            {
                filename,
                code: "let foo = {}; foo.formatToParts(num)",
            },
            {
                filename,
                code: "formatToParts(num)",
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
                code: "let foo = new Intl.NumberFormat(); foo.formatToParts(num)",
                errors: [
                    "ES2018 Intl API 'Intl.NumberFormat.prototype.formatToParts' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f(a: Intl.NumberFormat) { a.formatToParts(num) }",
                errors: [
                    "ES2018 Intl API 'Intl.NumberFormat.prototype.formatToParts' method is forbidden.",
                ],
            },
            {
                filename,
                code: "foo.formatToParts(num)",
                errors: [
                    "ES2018 Intl API 'Intl.NumberFormat.prototype.formatToParts' method is forbidden.",
                ],
                settings: { "es-x": { aggressive: true } },
            },
        ],
    },
)
