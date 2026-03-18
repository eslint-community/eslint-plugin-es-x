"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-intl-pluralrules-prototype-properties.js")
const {
    intlPluralRulesPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-intl-pluralrules-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...intlPluralRulesPrototypeProperties].map(
            (p) => `new Intl.PluralRules().${p}`,
        ),
        {
            code: "new Intl.PluralRules().unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "new Intl.PluralRules().unknown()",
            errors: [
                "Non-standard 'Intl.PluralRules.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "new Intl.PluralRules().foo",
            errors: [
                "Non-standard 'Intl.PluralRules.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "new Intl.PluralRules().bar",
            errors: [
                "Non-standard 'Intl.PluralRules.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "new Intl.PluralRules()[0]",
            errors: [
                "Non-standard 'Intl.PluralRules.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new Intl.PluralRules()['0']",
            errors: [
                "Non-standard 'Intl.PluralRules.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new Intl.PluralRules()['01']",
            errors: [
                "Non-standard 'Intl.PluralRules.prototype.01' property is forbidden.",
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
        { filename, code: "foo" },
        { filename, code: "foo.toString" },
        { filename, code: "foo.foo" },
        { filename, code: "let foo = {}; foo.foo" },
        ...[...intlPluralRulesPrototypeProperties].map((p) => ({
            filename,
            code: `new Intl.PluralRules().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "new Intl.PluralRules().foo",
            errors: [
                "Non-standard 'Intl.PluralRules.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.PluralRules().bar",
            errors: [
                "Non-standard 'Intl.PluralRules.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.PluralRules()[0]",
            errors: [
                "Non-standard 'Intl.PluralRules.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.PluralRules()['0']",
            errors: [
                "Non-standard 'Intl.PluralRules.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.PluralRules()['01']",
            errors: [
                "Non-standard 'Intl.PluralRules.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new Intl.PluralRules(); foo.foo",
            errors: [
                "Non-standard 'Intl.PluralRules.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Intl.PluralRules>(a: T) { a.baz }",
            errors: [
                "Non-standard 'Intl.PluralRules.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
