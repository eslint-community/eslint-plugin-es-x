import * as path from "node:path"
import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-nonstandard-temporal-plaintime-prototype-properties"
import { temporalPlainTimePrototypeProperties } from "../../../lib/util/well-known-properties"
import * as parser from "@typescript-eslint/parser"
const ruleId = "no-nonstandard-temporal-plaintime-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...temporalPlainTimePrototypeProperties].map(
            (p) => `(new Temporal.PlainTime()).${p}`,
        ),
        {
            code: "(new Temporal.PlainTime()).unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "(new Temporal.PlainTime()).unknown()",
            errors: [
                "Non-standard 'Temporal.PlainTime.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.PlainTime()).foo",
            errors: [
                "Non-standard 'Temporal.PlainTime.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.PlainTime())[0]",
            errors: [
                "Non-standard 'Temporal.PlainTime.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.PlainTime())['01']",
            errors: [
                "Non-standard 'Temporal.PlainTime.prototype.01' property is forbidden.",
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
        ...[...temporalPlainTimePrototypeProperties].map((p) => ({
            filename,
            code: `(new Temporal.PlainTime()).${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "(new Temporal.PlainTime()).foo",
            errors: [
                "Non-standard 'Temporal.PlainTime.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "(new Temporal.PlainTime())[0]",
            errors: [
                "Non-standard 'Temporal.PlainTime.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "(new Temporal.PlainTime())['01']",
            errors: [
                "Non-standard 'Temporal.PlainTime.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = (new Temporal.PlainTime()); foo.foo",
            errors: [
                "Non-standard 'Temporal.PlainTime.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Temporal.PlainTime>(a: T) { a.baz }",
            errors: [
                "Non-standard 'Temporal.PlainTime.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
