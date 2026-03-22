import * as path from "node:path"
import RuleTester from "../../tester"
import * as rule from "../../../lib/rules/no-nonstandard-temporal-plainmonthday-prototype-properties"
import { temporalPlainMonthDayPrototypeProperties } from "../../../lib/util/well-known-properties"
import * as parser from "@typescript-eslint/parser"
const ruleId = "no-nonstandard-temporal-plainmonthday-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...temporalPlainMonthDayPrototypeProperties].map(
            (p) => `(new Temporal.PlainMonthDay()).${p}`,
        ),
        {
            code: "(new Temporal.PlainMonthDay()).unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "(new Temporal.PlainMonthDay()).unknown()",
            errors: [
                "Non-standard 'Temporal.PlainMonthDay.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.PlainMonthDay()).foo",
            errors: [
                "Non-standard 'Temporal.PlainMonthDay.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.PlainMonthDay())[0]",
            errors: [
                "Non-standard 'Temporal.PlainMonthDay.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "(new Temporal.PlainMonthDay())['01']",
            errors: [
                "Non-standard 'Temporal.PlainMonthDay.prototype.01' property is forbidden.",
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
        ...[...temporalPlainMonthDayPrototypeProperties].map((p) => ({
            filename,
            code: `(new Temporal.PlainMonthDay()).${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "(new Temporal.PlainMonthDay()).foo",
            errors: [
                "Non-standard 'Temporal.PlainMonthDay.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "(new Temporal.PlainMonthDay())[0]",
            errors: [
                "Non-standard 'Temporal.PlainMonthDay.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "(new Temporal.PlainMonthDay())['01']",
            errors: [
                "Non-standard 'Temporal.PlainMonthDay.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = (new Temporal.PlainMonthDay()); foo.foo",
            errors: [
                "Non-standard 'Temporal.PlainMonthDay.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Temporal.PlainMonthDay>(a: T) { a.baz }",
            errors: [
                "Non-standard 'Temporal.PlainMonthDay.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
