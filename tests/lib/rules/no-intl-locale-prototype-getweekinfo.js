"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-intl-locale-prototype-getweekinfo.js")
const ruleId = "no-intl-locale-prototype-getweekinfo"

new RuleTester().run(ruleId, rule, {
    valid: [
        "getWeekInfo()",
        "foo.getWeekInfo()",
        { code: "getWeekInfo()", settings: { "es-x": { aggressive: true } } },
        { code: "foo.toString()", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.getWeekInfo()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.getWeekInfo()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getWeekInfo' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.getWeekInfo()",
            options: [{ aggressive: true }],
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getWeekInfo' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: "const foo = new Intl.Locale(); foo.getWeekInfo()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getWeekInfo' method is forbidden.",
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
        { filename, code: "getWeekInfo()" },
        { filename, code: "foo.toString()" },
        { filename, code: "foo.getWeekInfo()" },
        { filename, code: "let foo = {}; foo.getWeekInfo()" },
        {
            filename,
            code: "getWeekInfo()",
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
            code: "(new Intl.Locale()).getWeekInfo()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getWeekInfo' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new Intl.Locale(); foo.getWeekInfo()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getWeekInfo' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Intl.Locale>(a: T) { a.getWeekInfo() }",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getWeekInfo' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.getWeekInfo()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getWeekInfo' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
