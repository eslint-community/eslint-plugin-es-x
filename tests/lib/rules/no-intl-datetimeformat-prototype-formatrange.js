"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-intl-datetimeformat-prototype-formatrange.js")
const ruleId = "no-intl-datetimeformat-prototype-formatrange"

new RuleTester().run(ruleId, rule, {
    valid: [
        "formatRange(startDate, endDate)",
        "foo.unknown(0)",
        "foo.formatRange(startDate, endDate)",
        {
            code: "formatRange(startDate, endDate)",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.unknown(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.formatRange(startDate, endDate)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.formatRange(startDate, endDate)",
            errors: [
                "ES2021 Intl API 'Intl.DateTimeFormat.prototype.formatRange' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.formatRange(startDate, endDate)",
            options: [{ aggressive: true }],
            errors: [
                "ES2021 Intl API 'Intl.DateTimeFormat.prototype.formatRange' method is forbidden.",
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
    languageOptions: { parser, parserOptions: { tsconfigRootDir, project } },
}).run(`${ruleId} TS Full Type Information`, rule, {
    valid: [
        { filename, code: "formatRange(startDate, endDate)" },
        { filename, code: "foo.unknown(0)" },
        { filename, code: "foo.formatRange(startDate, endDate)" },
        {
            filename,
            code: "let foo = {}; foo.formatRange(startDate, endDate)",
        },
        {
            filename,
            code: "formatRange(startDate, endDate)",
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
            code: "let foo = new Intl.DateTimeFormat(); foo.formatRange(startDate, endDate)",
            errors: [
                "ES2021 Intl API 'Intl.DateTimeFormat.prototype.formatRange' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f(a: Intl.DateTimeFormat) { a.formatRange(startDate, endDate) }",
            errors: [
                "ES2021 Intl API 'Intl.DateTimeFormat.prototype.formatRange' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.formatRange(startDate, endDate)",
            errors: [
                "ES2021 Intl API 'Intl.DateTimeFormat.prototype.formatRange' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
