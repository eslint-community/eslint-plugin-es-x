"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-number-prototype-properties.js")
const {
    numberPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-number-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...numberPrototypeProperties].map((p) => `(123).${p}`),
        { code: "(123).unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "(123).unknown()",
            errors: [
                "Non-standard 'Number.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "(123).foo",
            errors: [
                "Non-standard 'Number.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "(123).bar",
            errors: [
                "Non-standard 'Number.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "(123)[0]",
            errors: [
                "Non-standard 'Number.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "(123)['0']",
            errors: [
                "Non-standard 'Number.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "(123)['01']",
            errors: [
                "Non-standard 'Number.prototype.01' property is forbidden.",
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
        ...[...numberPrototypeProperties].map((p) => ({
            filename,
            code: `(123).${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "(123).foo",
            errors: [
                "Non-standard 'Number.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "(123).bar",
            errors: [
                "Non-standard 'Number.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "(123)[0]",
            errors: [
                "Non-standard 'Number.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "(123)['0']",
            errors: [
                "Non-standard 'Number.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "(123)['01']",
            errors: [
                "Non-standard 'Number.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = (123); foo.foo",
            errors: [
                "Non-standard 'Number.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = Number(''); foo.bar",
            errors: [
                "Non-standard 'Number.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends number>(a: T) { a.baz }",
            errors: [
                "Non-standard 'Number.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
