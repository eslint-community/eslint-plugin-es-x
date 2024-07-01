"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-string-prototype-towellformed.js")
const ruleId = "no-string-prototype-towellformed"

new RuleTester().run(ruleId, rule, {
    valid: [
        "toWellFormed()",
        "foo.toWellFormed()",
        { code: "toWellFormed()", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.toWellFormed()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "'foo'.toWellFormed()",
            errors: [
                "ES2024 'String.prototype.toWellFormed' method is forbidden.",
            ],
        },
        {
            code: "'foo'.toWellFormed()",
            errors: [
                "ES2024 'String.prototype.toWellFormed' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "'foo'.toWellFormed()",
            options: [{ aggressive: true }],
            errors: [
                "ES2024 'String.prototype.toWellFormed' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
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

new RuleTester({ languageOptions: { parser } }).run(ruleId, rule, {
    valid: [
        { filename, code: "toWellFormed()" },
        { filename, code: "foo.toWellFormed()" },
        {
            filename,
            code: "toWellFormed()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.toWellFormed()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: "'foo'.toWellFormed()",
            errors: [
                "ES2024 'String.prototype.toWellFormed' method is forbidden.",
            ],
        },
        {
            filename,
            code: "'foo'.toWellFormed()",
            errors: [
                "ES2024 'String.prototype.toWellFormed' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "'foo'.toWellFormed()",
            options: [{ aggressive: true }],
            errors: [
                "ES2024 'String.prototype.toWellFormed' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})

new RuleTester({
    languageOptions: { parser, parserOptions: { tsconfigRootDir, project } },
}).run(`${ruleId} TS Full Type Information`, rule, {
    valid: [
        { filename, code: "toWellFormed()" },
        { filename, code: "foo.toWellFormed()" },
        {
            filename,
            code: "toWellFormed()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.toWellFormed()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: "'foo'.toWellFormed()",
            errors: [
                "ES2024 'String.prototype.toWellFormed' method is forbidden.",
            ],
        },
        {
            filename,
            code: "'foo'.toWellFormed()",
            errors: [
                "ES2024 'String.prototype.toWellFormed' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "'foo'.toWellFormed()",
            options: [{ aggressive: true }],
            errors: [
                "ES2024 'String.prototype.toWellFormed' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
