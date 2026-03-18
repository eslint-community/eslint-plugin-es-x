"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-intl-datetimeformat-prototype-properties.js")
const {
    intlDateTimeFormatPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-intl-datetimeformat-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...intlDateTimeFormatPrototypeProperties].map(
            (p) => `new Intl.DateTimeFormat().${p}`,
        ),
        {
            code: "new Intl.DateTimeFormat().unknown()",
            options: [{ allow: ["unknown"] }],
        },
        {
            code: `
            const a = new Intl.DateTimeFormat()
            if (a.unknown) {
                console.log(a.unknown())
            }`,
            options: [{ allowTestedProperty: true }],
        },
    ],
    invalid: [
        {
            code: "new Intl.DateTimeFormat().unknown()",
            errors: [
                "Non-standard 'Intl.DateTimeFormat.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "new Intl.DateTimeFormat().foo",
            errors: [
                "Non-standard 'Intl.DateTimeFormat.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "new Intl.DateTimeFormat().bar",
            errors: [
                "Non-standard 'Intl.DateTimeFormat.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "new Intl.DateTimeFormat()[0]",
            errors: [
                "Non-standard 'Intl.DateTimeFormat.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new Intl.DateTimeFormat()['0']",
            errors: [
                "Non-standard 'Intl.DateTimeFormat.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new Intl.DateTimeFormat()['01']",
            errors: [
                "Non-standard 'Intl.DateTimeFormat.prototype.01' property is forbidden.",
            ],
        },
        {
            code: `
            const a = new Intl.DateTimeFormat()
            if (a.unknown) {
                console.log(a.unknown())
            }`,
            errors: 2,
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
        ...[...intlDateTimeFormatPrototypeProperties].map((p) => ({
            filename,
            code: `new Intl.DateTimeFormat().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "new Intl.DateTimeFormat().foo",
            errors: [
                "Non-standard 'Intl.DateTimeFormat.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.DateTimeFormat().bar",
            errors: [
                "Non-standard 'Intl.DateTimeFormat.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.DateTimeFormat()[0]",
            errors: [
                "Non-standard 'Intl.DateTimeFormat.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.DateTimeFormat()['0']",
            errors: [
                "Non-standard 'Intl.DateTimeFormat.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.DateTimeFormat()['01']",
            errors: [
                "Non-standard 'Intl.DateTimeFormat.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new Intl.DateTimeFormat(); foo.foo",
            errors: [
                "Non-standard 'Intl.DateTimeFormat.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Intl.DateTimeFormat>(a: T) { a.baz }",
            errors: [
                "Non-standard 'Intl.DateTimeFormat.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
