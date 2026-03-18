"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-intl-locale-prototype-gethourcycles.js")
const ruleId = "no-intl-locale-prototype-gethourcycles"

new RuleTester().run(ruleId, rule, {
    valid: [
        "getHourCycles()",
        "foo.getHourCycles()",
        { code: "getHourCycles()", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.toString()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.getHourCycles()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.getHourCycles()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getHourCycles' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.getHourCycles()",
            options: [{ aggressive: true }],
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getHourCycles' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: "const foo = new Intl.Locale(); foo.getHourCycles()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getHourCycles' method is forbidden.",
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
        { filename, code: "getHourCycles()" },
        { filename, code: "foo.toString()" },
        { filename, code: "foo.getHourCycles()" },
        { filename, code: "let foo = {}; foo.getHourCycles()" },
        {
            filename,
            code: "getHourCycles()",
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
            code: "(new Intl.Locale()).getHourCycles()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getHourCycles' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new Intl.Locale(); foo.getHourCycles()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getHourCycles' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Intl.Locale>(a: T) { a.getHourCycles() }",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getHourCycles' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.getHourCycles()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getHourCycles' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
