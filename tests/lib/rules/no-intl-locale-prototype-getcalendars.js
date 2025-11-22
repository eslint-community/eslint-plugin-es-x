"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-intl-locale-prototype-getcalendars.js")
const ruleId = "no-intl-locale-prototype-getcalendars"

new RuleTester().run(ruleId, rule, {
    valid: [
        "getCalendars()",
        "foo.getCalendars()",
        { code: "getCalendars()", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.toString()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.getCalendars()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.getCalendars()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getCalendars' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.getCalendars()",
            options: [{ aggressive: true }],
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getCalendars' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: "const foo = new Intl.Locale(); foo.getCalendars()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getCalendars' method is forbidden.",
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
        { filename, code: "getCalendars()" },
        { filename, code: "foo.toString()" },
        { filename, code: "foo.getCalendars()" },
        { filename, code: "let foo = {}; foo.getCalendars()" },
        {
            filename,
            code: "getCalendars()",
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
            code: "(new Intl.Locale()).getCalendars()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getCalendars' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new Intl.Locale(); foo.getCalendars()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getCalendars' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Intl.Locale>(a: T) { a.getCalendars() }",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getCalendars' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.getCalendars()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getCalendars' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
