"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-temporal-plaindatetime-prototype-properties.js")
const {
    temporalPlainDateTimePrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-temporal-plaindatetime-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...temporalPlainDateTimePrototypeProperties].map(
            (p) => `(new Temporal.PlainDateTime()).${p}`,
        ),
        {
            code: "(new Temporal.PlainDateTime()).unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "(new Temporal.PlainDateTime()).unknown()",
            errors: [
                "Non-standard 'Temporal.PlainDateTime.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.PlainDateTime()).foo",
            errors: [
                "Non-standard 'Temporal.PlainDateTime.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.PlainDateTime())[0]",
            errors: [
                "Non-standard 'Temporal.PlainDateTime.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.PlainDateTime())['01']",
            errors: [
                "Non-standard 'Temporal.PlainDateTime.prototype.01' property is forbidden.",
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
}).run(
    "no-nonstandard-temporal-plaindatetime-prototype-properties TS Full Type Information",
    rule,
    {
        valid: [
            { filename, code: "foo" },
            { filename, code: "foo.toString" },
            { filename, code: "foo.foo" },
            { filename, code: "let foo = {}; foo.foo" },
            ...[...temporalPlainDateTimePrototypeProperties].map((p) => ({
                filename,
                code: `(new Temporal.PlainDateTime()).${p}`,
            })),
        ],
        invalid: [
            {
                filename,
                code: "(new Temporal.PlainDateTime()).foo",
                errors: [
                    "Non-standard 'Temporal.PlainDateTime.prototype.foo' property is forbidden.",
                ],
            },
            {
                filename,
                code: "(new Temporal.PlainDateTime())[0]",
                errors: [
                    "Non-standard 'Temporal.PlainDateTime.prototype.0' property is forbidden.",
                ],
            },
            {
                filename,
                code: "(new Temporal.PlainDateTime())['01']",
                errors: [
                    "Non-standard 'Temporal.PlainDateTime.prototype.01' property is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = (new Temporal.PlainDateTime()); foo.foo",
                errors: [
                    "Non-standard 'Temporal.PlainDateTime.prototype.foo' property is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends Temporal.PlainDateTime>(a: T) { a.baz }",
                errors: [
                    "Non-standard 'Temporal.PlainDateTime.prototype.baz' property is forbidden.",
                ],
            },
        ],
    },
)
