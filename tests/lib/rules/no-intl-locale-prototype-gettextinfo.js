"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-intl-locale-prototype-gettextinfo.js")
const ruleId = "no-intl-locale-prototype-gettextinfo"

new RuleTester().run(ruleId, rule, {
    valid: [
        "getTextInfo()",
        "foo.getTextInfo()",
        { code: "getTextInfo()", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.toString()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.getTextInfo()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.getTextInfo()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getTextInfo' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.getTextInfo()",
            options: [{ aggressive: true }],
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getTextInfo' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: "const foo = new Intl.Locale(); foo.getTextInfo()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getTextInfo' method is forbidden.",
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
        { filename, code: "getTextInfo()" },
        { filename, code: "foo.toString()" },
        { filename, code: "foo.getTextInfo()" },
        { filename, code: "let foo = {}; foo.getTextInfo()" },
        {
            filename,
            code: "getTextInfo()",
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
            code: "(new Intl.Locale()).getTextInfo()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getTextInfo' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new Intl.Locale(); foo.getTextInfo()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getTextInfo' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Intl.Locale>(a: T) { a.getTextInfo() }",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getTextInfo' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.getTextInfo()",
            errors: [
                "ES2026 Intl API 'Intl.Locale.prototype.getTextInfo' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
