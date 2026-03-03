"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-temporal-duration-prototype-properties.js")
const {
    temporalDurationPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-temporal-duration-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...temporalDurationPrototypeProperties].map(
            (p) => `(new Temporal.Duration()).${p}`,
        ),
        {
            code: "(new Temporal.Duration()).unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "(new Temporal.Duration()).unknown()",
            errors: [
                "Non-standard 'Temporal.Duration.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.Duration()).foo",
            errors: [
                "Non-standard 'Temporal.Duration.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.Duration())[0]",
            errors: [
                "Non-standard 'Temporal.Duration.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.Duration())['01']",
            errors: [
                "Non-standard 'Temporal.Duration.prototype.01' property is forbidden.",
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
    "no-nonstandard-temporal-duration-prototype-properties TS Full Type Information",
    rule,
    {
        valid: [
            { filename, code: "foo" },
            { filename, code: "foo.toString" },
            { filename, code: "foo.foo" },
            { filename, code: "let foo = {}; foo.foo" },
            ...[...temporalDurationPrototypeProperties].map((p) => ({
                filename,
                code: `(new Temporal.Duration()).${p}`,
            })),
        ],
        invalid: [
            {
                filename,
                code: "(new Temporal.Duration()).foo",
                errors: [
                    "Non-standard 'Temporal.Duration.prototype.foo' property is forbidden.",
                ],
            },
            {
                filename,
                code: "(new Temporal.Duration())[0]",
                errors: [
                    "Non-standard 'Temporal.Duration.prototype.0' property is forbidden.",
                ],
            },
            {
                filename,
                code: "(new Temporal.Duration())['01']",
                errors: [
                    "Non-standard 'Temporal.Duration.prototype.01' property is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = (new Temporal.Duration()); foo.foo",
                errors: [
                    "Non-standard 'Temporal.Duration.prototype.foo' property is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends Temporal.Duration>(a: T) { a.baz }",
                errors: [
                    "Non-standard 'Temporal.Duration.prototype.baz' property is forbidden.",
                ],
            },
        ],
    },
)
