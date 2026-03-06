"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-temporal-instant-prototype-properties.js")
const {
    temporalInstantPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-temporal-instant-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...temporalInstantPrototypeProperties].map(
            (p) => `(new Temporal.Instant()).${p}`,
        ),
        {
            code: "(new Temporal.Instant()).unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "(new Temporal.Instant()).unknown()",
            errors: [
                "Non-standard 'Temporal.Instant.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.Instant()).foo",
            errors: [
                "Non-standard 'Temporal.Instant.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.Instant())[0]",
            errors: [
                "Non-standard 'Temporal.Instant.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.Instant())['01']",
            errors: [
                "Non-standard 'Temporal.Instant.prototype.01' property is forbidden.",
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
    "no-nonstandard-temporal-instant-prototype-properties TS Full Type Information",
    rule,
    {
        valid: [
            { filename, code: "foo" },
            { filename, code: "foo.toString" },
            { filename, code: "foo.foo" },
            { filename, code: "let foo = {}; foo.foo" },
            ...[...temporalInstantPrototypeProperties].map((p) => ({
                filename,
                code: `(new Temporal.Instant()).${p}`,
            })),
        ],
        invalid: [
            {
                filename,
                code: "(new Temporal.Instant()).foo",
                errors: [
                    "Non-standard 'Temporal.Instant.prototype.foo' property is forbidden.",
                ],
            },
            {
                filename,
                code: "(new Temporal.Instant())[0]",
                errors: [
                    "Non-standard 'Temporal.Instant.prototype.0' property is forbidden.",
                ],
            },
            {
                filename,
                code: "(new Temporal.Instant())['01']",
                errors: [
                    "Non-standard 'Temporal.Instant.prototype.01' property is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = (new Temporal.Instant()); foo.foo",
                errors: [
                    "Non-standard 'Temporal.Instant.prototype.foo' property is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends Temporal.Instant>(a: T) { a.baz }",
                errors: [
                    "Non-standard 'Temporal.Instant.prototype.baz' property is forbidden.",
                ],
            },
        ],
    },
)
