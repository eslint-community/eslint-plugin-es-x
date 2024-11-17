"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-intl-relativetimeformat-prototype-properties.js")
const {
    intlRelativeTimeFormatPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-intl-relativetimeformat-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...intlRelativeTimeFormatPrototypeProperties].map(
            (p) => `new Intl.RelativeTimeFormat().${p}`,
        ),
        {
            code: "new Intl.RelativeTimeFormat().unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "new Intl.RelativeTimeFormat().unknown()",
            errors: [
                "Non-standard 'Intl.RelativeTimeFormat.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "new Intl.RelativeTimeFormat().foo",
            errors: [
                "Non-standard 'Intl.RelativeTimeFormat.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "new Intl.RelativeTimeFormat().bar",
            errors: [
                "Non-standard 'Intl.RelativeTimeFormat.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "new Intl.RelativeTimeFormat()[0]",
            errors: [
                "Non-standard 'Intl.RelativeTimeFormat.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new Intl.RelativeTimeFormat()['0']",
            errors: [
                "Non-standard 'Intl.RelativeTimeFormat.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new Intl.RelativeTimeFormat()['01']",
            errors: [
                "Non-standard 'Intl.RelativeTimeFormat.prototype.01' property is forbidden.",
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
        ...[...intlRelativeTimeFormatPrototypeProperties].map((p) => ({
            filename,
            code: `new Intl.RelativeTimeFormat().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "new Intl.RelativeTimeFormat().foo",
            errors: [
                "Non-standard 'Intl.RelativeTimeFormat.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.RelativeTimeFormat().bar",
            errors: [
                "Non-standard 'Intl.RelativeTimeFormat.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.RelativeTimeFormat()[0]",
            errors: [
                "Non-standard 'Intl.RelativeTimeFormat.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.RelativeTimeFormat()['0']",
            errors: [
                "Non-standard 'Intl.RelativeTimeFormat.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.RelativeTimeFormat()['01']",
            errors: [
                "Non-standard 'Intl.RelativeTimeFormat.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new Intl.RelativeTimeFormat(); foo.foo",
            errors: [
                "Non-standard 'Intl.RelativeTimeFormat.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Intl.RelativeTimeFormat>(a: T) { a.baz }",
            errors: [
                "Non-standard 'Intl.RelativeTimeFormat.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
