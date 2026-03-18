import path from "path"
import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-nonstandard-temporal-zoneddatetime-prototype-properties"
import { temporalZonedDateTimePrototypeProperties } from "../../../lib/util/well-known-properties"
import * as parser from "@typescript-eslint/parser"
const ruleId = "no-nonstandard-temporal-zoneddatetime-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...temporalZonedDateTimePrototypeProperties].map(
            (p) => `(new Temporal.ZonedDateTime()).${p}`,
        ),
        {
            code: "(new Temporal.ZonedDateTime()).unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "(new Temporal.ZonedDateTime()).unknown()",
            errors: [
                "Non-standard 'Temporal.ZonedDateTime.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.ZonedDateTime()).foo",
            errors: [
                "Non-standard 'Temporal.ZonedDateTime.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.ZonedDateTime())[0]",
            errors: [
                "Non-standard 'Temporal.ZonedDateTime.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.ZonedDateTime())['01']",
            errors: [
                "Non-standard 'Temporal.ZonedDateTime.prototype.01' property is forbidden.",
            ],
        },
    ],
})

// -----------------------------------------------------------------------------
// TypeScript
// -----------------------------------------------------------------------------
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
        ...[...temporalZonedDateTimePrototypeProperties].map((p) => ({
            filename,
            code: `(new Temporal.ZonedDateTime()).${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "(new Temporal.ZonedDateTime()).foo",
            errors: [
                "Non-standard 'Temporal.ZonedDateTime.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "(new Temporal.ZonedDateTime())[0]",
            errors: [
                "Non-standard 'Temporal.ZonedDateTime.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "(new Temporal.ZonedDateTime())['01']",
            errors: [
                "Non-standard 'Temporal.ZonedDateTime.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = (new Temporal.ZonedDateTime()); foo.foo",
            errors: [
                "Non-standard 'Temporal.ZonedDateTime.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Temporal.ZonedDateTime>(a: T) { a.baz }",
            errors: [
                "Non-standard 'Temporal.ZonedDateTime.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
