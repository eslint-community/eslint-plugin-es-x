"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-intl-numberformat-prototype-formatrange.js")
const ruleId = "no-intl-numberformat-prototype-formatrange"

new RuleTester().run(ruleId, rule, {
    valid: [
        "formatRange(2.9, 3.1)",
        "foo.unknown(0)",
        "foo.formatRange(2.9, 3.1)",
        {
            code: "formatRange(2.9, 3.1)",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.unknown(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.formatRange(2.9, 3.1)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.formatRange(2.9, 3.1)",
            errors: [
                "ES2023 Intl API 'Intl.NumberFormat.prototype.formatRange' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.formatRange(2.9, 3.1)",
            options: [{ aggressive: true }],
            errors: [
                "ES2023 Intl API 'Intl.NumberFormat.prototype.formatRange' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: false } },
        },
    ],
})

// -----------------------------------------------------------------------------
// TypeScript
// -----------------------------------------------------------------------------
const parser = require("@typescript-eslint/parser")
const tsconfigRootDir = path.resolve(__dirname, "../../fixtures")
const project = "tsconfig.json"
const filename = path.join(tsconfigRootDir, "test.ts")

new RuleTester({
    languageOptions: {
        parser,
        parserOptions: {
            tsconfigRootDir,
            project,
            disallowAutomaticSingleRunInference: true,
        },
    },
}).run(`${ruleId} TS Full Type Information`, rule, {
    valid: [
        { filename, code: "formatRange(2.9, 3.1)" },
        { filename, code: "foo.unknown(0)" },
        { filename, code: "foo.formatRange(2.9, 3.1)" },
        {
            filename,
            code: "let foo = {}; foo.formatRange(2.9, 3.1)",
        },
        {
            filename,
            code: "formatRange(2.9, 3.1)",
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
            code: "let foo = new Intl.NumberFormat(); foo.formatRange(2.9, 3.1)",
            errors: [
                "ES2023 Intl API 'Intl.NumberFormat.prototype.formatRange' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f(a: Intl.NumberFormat) { a.formatRange(2.9, 3.1) }",
            errors: [
                "ES2023 Intl API 'Intl.NumberFormat.prototype.formatRange' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.formatRange(2.9, 3.1)",
            errors: [
                "ES2023 Intl API 'Intl.NumberFormat.prototype.formatRange' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
