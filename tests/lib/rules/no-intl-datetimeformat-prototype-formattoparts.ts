"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-intl-datetimeformat-prototype-formattoparts.js")
const ruleId = "no-intl-datetimeformat-prototype-formattoparts"

new RuleTester().run(ruleId, rule, {
    valid: [
        "formatToParts(now)",
        "foo.unknown(0)",
        "foo.formatToParts(now)",
        {
            code: "formatToParts(now)",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.unknown(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.formatToParts(now)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.formatToParts(now)",
            errors: [
                "ES2017 Intl API 'Intl.DateTimeFormat.prototype.formatToParts' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.formatToParts(now)",
            options: [{ aggressive: true }],
            errors: [
                "ES2017 Intl API 'Intl.DateTimeFormat.prototype.formatToParts' method is forbidden.",
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
        { filename, code: "formatToParts(now)" },
        { filename, code: "foo.unknown(0)" },
        { filename, code: "foo.formatToParts(now)" },
        {
            filename,
            code: "let foo = {}; foo.formatToParts(now)",
        },
        {
            filename,
            code: "formatToParts(now)",
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
            code: "let foo = new Intl.DateTimeFormat(); foo.formatToParts(now)",
            errors: [
                "ES2017 Intl API 'Intl.DateTimeFormat.prototype.formatToParts' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f(a: Intl.DateTimeFormat) { a.formatToParts(now) }",
            errors: [
                "ES2017 Intl API 'Intl.DateTimeFormat.prototype.formatToParts' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.formatToParts(now)",
            errors: [
                "ES2017 Intl API 'Intl.DateTimeFormat.prototype.formatToParts' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
