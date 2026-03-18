"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-intl-locale-prototype-gettimezones.js")
const ruleId = "no-intl-locale-prototype-gettimezones"

new RuleTester().run(ruleId, rule, {
    valid: [
        "getTimeZones()",
        "foo.getTimeZones()",
        { code: "getTimeZones()", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.toString()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.getTimeZones()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.getTimeZones()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getTimeZones' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.getTimeZones()",
            options: [{ aggressive: true }],
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getTimeZones' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: "const foo = new Intl.Locale(); foo.getTimeZones()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getTimeZones' method is forbidden.",
            ],
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
        { filename, code: "getTimeZones()" },
        { filename, code: "foo.toString()" },
        { filename, code: "foo.getTimeZones()" },
        { filename, code: "let foo = {}; foo.getTimeZones()" },
        {
            filename,
            code: "getTimeZones()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.toString()",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: "(new Intl.Locale()).getTimeZones()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getTimeZones' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new Intl.Locale(); foo.getTimeZones()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getTimeZones' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Intl.Locale>(a: T) { a.getTimeZones() }",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getTimeZones' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.getTimeZones()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getTimeZones' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
