"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-intl-locale-prototype-properties.js")
const {
    intlLocalePrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-intl-locale-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...intlLocalePrototypeProperties].map(
            (p) => `new Intl.Locale().${p}`,
        ),
        {
            code: "new Intl.Locale().unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "new Intl.Locale().unknown()",
            errors: [
                "Non-standard 'Intl.Locale.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "new Intl.Locale().foo",
            errors: [
                "Non-standard 'Intl.Locale.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "new Intl.Locale().bar",
            errors: [
                "Non-standard 'Intl.Locale.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "new Intl.Locale()[0]",
            errors: [
                "Non-standard 'Intl.Locale.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new Intl.Locale()['0']",
            errors: [
                "Non-standard 'Intl.Locale.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new Intl.Locale()['01']",
            errors: [
                "Non-standard 'Intl.Locale.prototype.01' property is forbidden.",
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
        ...[...intlLocalePrototypeProperties].map((p) => ({
            filename,
            code: `new Intl.Locale().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "new Intl.Locale().foo",
            errors: [
                "Non-standard 'Intl.Locale.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.Locale().bar",
            errors: [
                "Non-standard 'Intl.Locale.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.Locale()[0]",
            errors: [
                "Non-standard 'Intl.Locale.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.Locale()['0']",
            errors: [
                "Non-standard 'Intl.Locale.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.Locale()['01']",
            errors: [
                "Non-standard 'Intl.Locale.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new Intl.Locale(); foo.foo",
            errors: [
                "Non-standard 'Intl.Locale.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Intl.Locale>(a: T) { a.baz }",
            errors: [
                "Non-standard 'Intl.Locale.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
