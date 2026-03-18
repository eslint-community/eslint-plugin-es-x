"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-intl-numberformat-prototype-properties.js")
const {
    intlNumberFormatPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-intl-numberformat-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...intlNumberFormatPrototypeProperties].map(
            (p) => `new Intl.NumberFormat().${p}`,
        ),
        {
            code: "new Intl.NumberFormat().unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "new Intl.NumberFormat().unknown()",
            errors: [
                "Non-standard 'Intl.NumberFormat.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "new Intl.NumberFormat().foo",
            errors: [
                "Non-standard 'Intl.NumberFormat.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "new Intl.NumberFormat().bar",
            errors: [
                "Non-standard 'Intl.NumberFormat.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "new Intl.NumberFormat()[0]",
            errors: [
                "Non-standard 'Intl.NumberFormat.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new Intl.NumberFormat()['0']",
            errors: [
                "Non-standard 'Intl.NumberFormat.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new Intl.NumberFormat()['01']",
            errors: [
                "Non-standard 'Intl.NumberFormat.prototype.01' property is forbidden.",
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
        ...[...intlNumberFormatPrototypeProperties].map((p) => ({
            filename,
            code: `new Intl.NumberFormat().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "new Intl.NumberFormat().foo",
            errors: [
                "Non-standard 'Intl.NumberFormat.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.NumberFormat().bar",
            errors: [
                "Non-standard 'Intl.NumberFormat.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.NumberFormat()[0]",
            errors: [
                "Non-standard 'Intl.NumberFormat.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.NumberFormat()['0']",
            errors: [
                "Non-standard 'Intl.NumberFormat.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.NumberFormat()['01']",
            errors: [
                "Non-standard 'Intl.NumberFormat.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new Intl.NumberFormat(); foo.foo",
            errors: [
                "Non-standard 'Intl.NumberFormat.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Intl.NumberFormat>(a: T) { a.baz }",
            errors: [
                "Non-standard 'Intl.NumberFormat.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
