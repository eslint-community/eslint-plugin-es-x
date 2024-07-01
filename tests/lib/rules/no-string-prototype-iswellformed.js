"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-string-prototype-iswellformed.js")
const ruleId = "no-string-prototype-iswellformed"

new RuleTester().run(ruleId, rule, {
    valid: [
        "isWellFormed()",
        "foo.isWellFormed()",
        { code: "isWellFormed()", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.isWellFormed()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "'foo'.isWellFormed()",
            errors: [
                "ES2024 'String.prototype.isWellFormed' method is forbidden.",
            ],
        },
        {
            code: "'foo'.isWellFormed()",
            errors: [
                "ES2024 'String.prototype.isWellFormed' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "'foo'.isWellFormed()",
            options: [{ aggressive: true }],
            errors: [
                "ES2024 'String.prototype.isWellFormed' method is forbidden.",
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
        { filename, code: "isWellFormed()" },
        { filename, code: "foo.isWellFormed()" },
        {
            filename,
            code: "isWellFormed()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.isWellFormed()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: "'foo'.isWellFormed()",
            errors: [
                "ES2024 'String.prototype.isWellFormed' method is forbidden.",
            ],
        },
        {
            filename,
            code: "'foo'.isWellFormed()",
            errors: [
                "ES2024 'String.prototype.isWellFormed' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "'foo'.isWellFormed()",
            options: [{ aggressive: true }],
            errors: [
                "ES2024 'String.prototype.isWellFormed' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})

new RuleTester({
    languageOptions: { parser, parserOptions: { tsconfigRootDir, project } },
}).run(`${ruleId} TS Full Type Information`, rule, {
    valid: [
        { filename, code: "isWellFormed()" },
        { filename, code: "foo.isWellFormed()" },
        {
            filename,
            code: "isWellFormed()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.isWellFormed()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: "'foo'.isWellFormed()",
            errors: [
                "ES2024 'String.prototype.isWellFormed' method is forbidden.",
            ],
        },
        {
            filename,
            code: "'foo'.isWellFormed()",
            errors: [
                "ES2024 'String.prototype.isWellFormed' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "'foo'.isWellFormed()",
            options: [{ aggressive: true }],
            errors: [
                "ES2024 'String.prototype.isWellFormed' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
