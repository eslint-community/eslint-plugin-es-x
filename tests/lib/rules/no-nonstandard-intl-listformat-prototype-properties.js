"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-intl-listformat-prototype-properties.js")
const {
    intlListFormatPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-intl-listformat-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...intlListFormatPrototypeProperties].map(
            (p) => `new Intl.ListFormat().${p}`,
        ),
        {
            code: "new Intl.ListFormat().unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "new Intl.ListFormat().unknown()",
            errors: [
                "Non-standard 'Intl.ListFormat.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "new Intl.ListFormat().foo",
            errors: [
                "Non-standard 'Intl.ListFormat.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "new Intl.ListFormat().bar",
            errors: [
                "Non-standard 'Intl.ListFormat.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "new Intl.ListFormat()[0]",
            errors: [
                "Non-standard 'Intl.ListFormat.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new Intl.ListFormat()['0']",
            errors: [
                "Non-standard 'Intl.ListFormat.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new Intl.ListFormat()['01']",
            errors: [
                "Non-standard 'Intl.ListFormat.prototype.01' property is forbidden.",
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
        ...[...intlListFormatPrototypeProperties].map((p) => ({
            filename,
            code: `new Intl.ListFormat().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "new Intl.ListFormat().foo",
            errors: [
                "Non-standard 'Intl.ListFormat.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.ListFormat().bar",
            errors: [
                "Non-standard 'Intl.ListFormat.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.ListFormat()[0]",
            errors: [
                "Non-standard 'Intl.ListFormat.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.ListFormat()['0']",
            errors: [
                "Non-standard 'Intl.ListFormat.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.ListFormat()['01']",
            errors: [
                "Non-standard 'Intl.ListFormat.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new Intl.ListFormat(); foo.foo",
            errors: [
                "Non-standard 'Intl.ListFormat.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Intl.ListFormat>(a: T) { a.baz }",
            errors: [
                "Non-standard 'Intl.ListFormat.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
