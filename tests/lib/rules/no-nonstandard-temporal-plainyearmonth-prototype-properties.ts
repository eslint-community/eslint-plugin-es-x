import * as path from "node:path"
import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-nonstandard-temporal-plainyearmonth-prototype-properties"
import { temporalPlainYearMonthPrototypeProperties } from "../../../lib/util/well-known-properties"
import * as parser from "@typescript-eslint/parser"
const ruleId = "no-nonstandard-temporal-plainyearmonth-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...temporalPlainYearMonthPrototypeProperties].map(
            (p) => `(new Temporal.PlainYearMonth()).${p}`,
        ),
        {
            code: "(new Temporal.PlainYearMonth()).unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "(new Temporal.PlainYearMonth()).unknown()",
            errors: [
                "Non-standard 'Temporal.PlainYearMonth.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.PlainYearMonth()).foo",
            errors: [
                "Non-standard 'Temporal.PlainYearMonth.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.PlainYearMonth())[0]",
            errors: [
                "Non-standard 'Temporal.PlainYearMonth.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.PlainYearMonth())['01']",
            errors: [
                "Non-standard 'Temporal.PlainYearMonth.prototype.01' property is forbidden.",
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
        ...[...temporalPlainYearMonthPrototypeProperties].map((p) => ({
            filename,
            code: `(new Temporal.PlainYearMonth()).${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "(new Temporal.PlainYearMonth()).foo",
            errors: [
                "Non-standard 'Temporal.PlainYearMonth.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "(new Temporal.PlainYearMonth())[0]",
            errors: [
                "Non-standard 'Temporal.PlainYearMonth.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "(new Temporal.PlainYearMonth())['01']",
            errors: [
                "Non-standard 'Temporal.PlainYearMonth.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = (new Temporal.PlainYearMonth()); foo.foo",
            errors: [
                "Non-standard 'Temporal.PlainYearMonth.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Temporal.PlainYearMonth>(a: T) { a.baz }",
            errors: [
                "Non-standard 'Temporal.PlainYearMonth.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
