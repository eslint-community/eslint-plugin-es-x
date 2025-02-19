"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-intl-durationformat-prototype-properties.js")
const {
    intlDurationFormatPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-intl-durationformat-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...intlDurationFormatPrototypeProperties].map(
            (p) => `new Intl.DurationFormat().${p}`,
        ),
        {
            code: "new Intl.DurationFormat().unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "new Intl.DurationFormat().unknown()",
            errors: [
                "Non-standard 'Intl.DurationFormat.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "new Intl.DurationFormat().foo",
            errors: [
                "Non-standard 'Intl.DurationFormat.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "new Intl.DurationFormat().bar",
            errors: [
                "Non-standard 'Intl.DurationFormat.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "new Intl.DurationFormat()[0]",
            errors: [
                "Non-standard 'Intl.DurationFormat.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new Intl.DurationFormat()['0']",
            errors: [
                "Non-standard 'Intl.DurationFormat.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new Intl.DurationFormat()['01']",
            errors: [
                "Non-standard 'Intl.DurationFormat.prototype.01' property is forbidden.",
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
        ...[...intlDurationFormatPrototypeProperties].map((p) => ({
            filename,
            code: `new Intl.DurationFormat().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "new Intl.DurationFormat().foo",
            errors: [
                "Non-standard 'Intl.DurationFormat.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.DurationFormat().bar",
            errors: [
                "Non-standard 'Intl.DurationFormat.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.DurationFormat()[0]",
            errors: [
                "Non-standard 'Intl.DurationFormat.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.DurationFormat()['0']",
            errors: [
                "Non-standard 'Intl.DurationFormat.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.DurationFormat()['01']",
            errors: [
                "Non-standard 'Intl.DurationFormat.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new Intl.DurationFormat(); foo.foo",
            errors: [
                "Non-standard 'Intl.DurationFormat.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Intl.DurationFormat>(a: T) { a.baz }",
            errors: [
                "Non-standard 'Intl.DurationFormat.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
