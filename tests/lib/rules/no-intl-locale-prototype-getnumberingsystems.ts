"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-intl-locale-prototype-getnumberingsystems.js")
const ruleId = "no-intl-locale-prototype-getnumberingsystems"

new RuleTester().run(ruleId, rule, {
    valid: [
        "getNumberingSystems()",
        "foo.getNumberingSystems()",
        {
            code: "getNumberingSystems()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.toString()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.getNumberingSystems()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.getNumberingSystems()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getNumberingSystems' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.getNumberingSystems()",
            options: [{ aggressive: true }],
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getNumberingSystems' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: "const foo = new Intl.Locale(); foo.getNumberingSystems()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getNumberingSystems' method is forbidden.",
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
        { filename, code: "getNumberingSystems()" },
        { filename, code: "foo.toString()" },
        { filename, code: "foo.getNumberingSystems()" },
        { filename, code: "let foo = {}; foo.getNumberingSystems()" },
        {
            filename,
            code: "getNumberingSystems()",
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
            code: "(new Intl.Locale()).getNumberingSystems()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getNumberingSystems' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new Intl.Locale(); foo.getNumberingSystems()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getNumberingSystems' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Intl.Locale>(a: T) { a.getNumberingSystems() }",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getNumberingSystems' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.getNumberingSystems()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getNumberingSystems' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
