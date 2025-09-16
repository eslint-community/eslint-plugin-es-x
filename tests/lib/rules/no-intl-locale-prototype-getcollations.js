"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-intl-locale-prototype-getcollations.js")
const ruleId = "no-intl-locale-prototype-getcollations"

new RuleTester().run(ruleId, rule, {
    valid: [
        "getCollations()",
        "foo.getCollations()",
        { code: "getCollations()", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.toString()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.getCollations()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.getCollations()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getCollations' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.getCollations()",
            options: [{ aggressive: true }],
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getCollations' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: "const foo = new Intl.Locale(); foo.getCollations()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getCollations' method is forbidden.",
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
        { filename, code: "getCollations()" },
        { filename, code: "foo.toString()" },
        { filename, code: "foo.getCollations()" },
        { filename, code: "let foo = {}; foo.getCollations()" },
        {
            filename,
            code: "getCollations()",
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
            code: "(new Intl.Locale()).getCollations()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getCollations' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new Intl.Locale(); foo.getCollations()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getCollations' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Intl.Locale>(a: T) { a.getCollations() }",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getCollations' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.getCollations()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getCollations' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
