"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-intl-pluralrules-prototype-selectrange.js")
const ruleId = "no-intl-pluralrules-prototype-selectrange"

new RuleTester().run(ruleId, rule, {
    valid: [
        "selectRange(2.9, 3.1)",
        "foo.unknown(0)",
        "foo.selectRange(2.9, 3.1)",
        {
            code: "selectRange(2.9, 3.1)",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.unknown(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.selectRange(2.9, 3.1)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.selectRange(2.9, 3.1)",
            errors: [
                "ES2023 Intl API 'Intl.PluralRules.prototype.selectRange' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.selectRange(2.9, 3.1)",
            options: [{ aggressive: true }],
            errors: [
                "ES2023 Intl API 'Intl.PluralRules.prototype.selectRange' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: false } },
        },
    ],
})

// -----------------------------------------------------------------------------
// TypeScript
// -----------------------------------------------------------------------------
const parser = require.resolve("@typescript-eslint/parser")
const tsconfigRootDir = path.resolve(__dirname, "../../fixtures")
const project = "tsconfig.json"
const filename = path.join(tsconfigRootDir, "test.ts")

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Type Information`,
    rule,
    {
        valid: [
            { filename, code: "selectRange(2.9, 3.1)" },
            { filename, code: "foo.unknown(0)" },
            { filename, code: "foo.selectRange(2.9, 3.1)" },
            {
                filename,
                code: "let foo = {}; foo.selectRange(2.9, 3.1)",
            },
            {
                filename,
                code: "selectRange(2.9, 3.1)",
                settings: { "es-x": { aggressive: true } },
            },
            {
                filename,
                code: "foo.unknown(0)",
                settings: { "es-x": { aggressive: true } },
            },
        ],
        invalid: [
            {
                filename,
                code: "let foo = new Intl.PluralRules(); foo.selectRange(2.9, 3.1)",
                errors: [
                    "ES2023 Intl API 'Intl.PluralRules.prototype.selectRange' method is forbidden.",
                ],
            },
            {
                filename,
                code: "function f(a: Intl.PluralRules) { a.selectRange(2.9, 3.1) }",
                errors: [
                    "ES2023 Intl API 'Intl.PluralRules.prototype.selectRange' method is forbidden.",
                ],
            },
            {
                filename,
                code: "foo.selectRange(2.9, 3.1)",
                errors: [
                    "ES2023 Intl API 'Intl.PluralRules.prototype.selectRange' method is forbidden.",
                ],
                settings: { "es-x": { aggressive: true } },
            },
        ],
    },
)
