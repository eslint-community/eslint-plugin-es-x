"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-temporal-plaindate-prototype-properties.js")
const {
    temporalPlainDatePrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-temporal-plaindate-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...temporalPlainDatePrototypeProperties].map(
            (p) => `(new Temporal.PlainDate()).${p}`,
        ),
        {
            code: "(new Temporal.PlainDate()).unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "(new Temporal.PlainDate()).unknown()",
            errors: [
                "Non-standard 'Temporal.PlainDate.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.PlainDate()).foo",
            errors: [
                "Non-standard 'Temporal.PlainDate.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.PlainDate())[0]",
            errors: [
                "Non-standard 'Temporal.PlainDate.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.PlainDate())['01']",
            errors: [
                "Non-standard 'Temporal.PlainDate.prototype.01' property is forbidden.",
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
    "no-nonstandard-temporal-plaindate-prototype-properties TS Full Type Information",
    rule,
    {
        valid: [
            { filename, code: "foo" },
            { filename, code: "foo.toString" },
            { filename, code: "foo.foo" },
            { filename, code: "let foo = {}; foo.foo" },
            ...[...temporalPlainDatePrototypeProperties].map((p) => ({
                filename,
                code: `(new Temporal.PlainDate()).${p}`,
            })),
        ],
        invalid: [
            {
                filename,
                code: "(new Temporal.PlainDate()).foo",
                errors: [
                    "Non-standard 'Temporal.PlainDate.prototype.foo' property is forbidden.",
                ],
            },
            {
                filename,
                code: "(new Temporal.PlainDate())[0]",
                errors: [
                    "Non-standard 'Temporal.PlainDate.prototype.0' property is forbidden.",
                ],
            },
            {
                filename,
                code: "(new Temporal.PlainDate())['01']",
                errors: [
                    "Non-standard 'Temporal.PlainDate.prototype.01' property is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = (new Temporal.PlainDate()); foo.foo",
                errors: [
                    "Non-standard 'Temporal.PlainDate.prototype.foo' property is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends Temporal.PlainDate>(a: T) { a.baz }",
                errors: [
                    "Non-standard 'Temporal.PlainDate.prototype.baz' property is forbidden.",
                ],
            },
        ],
    },
)
