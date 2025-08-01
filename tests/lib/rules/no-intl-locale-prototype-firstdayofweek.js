"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-intl-locale-prototype-firstdayofweek.js")
const ruleId = "no-intl-locale-prototype-firstdayofweek"

new RuleTester().run(ruleId, rule, {
    valid: [
        "firstDayOfWeek",
        "foo.firstDayOfWeek",
        { code: "firstDayOfWeek", settings: { "es-x": { aggressive: true } } },
        { code: "foo.constructor", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.firstDayOfWeek",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.firstDayOfWeek",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.firstDayOfWeek' property is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.firstDayOfWeek",
            options: [{ aggressive: true }],
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.firstDayOfWeek' property is forbidden.",
            ],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: "const foo = new Intl.Locale(); foo.firstDayOfWeek",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.firstDayOfWeek' property is forbidden.",
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
        { filename, code: "firstDayOfWeek" },
        { filename, code: "foo.constructor" },
        { filename, code: "foo.firstDayOfWeek" },
        { filename, code: "let foo = {}; foo.firstDayOfWeek" },
        {
            filename,
            code: "firstDayOfWeek",
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.constructor",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: "(new Intl.Locale()).firstDayOfWeek",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.firstDayOfWeek' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new Intl.Locale(); foo.firstDayOfWeek",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.firstDayOfWeek' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Intl.Locale>(a: T) { a.firstDayOfWeek }",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.firstDayOfWeek' property is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.firstDayOfWeek",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.firstDayOfWeek' property is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
