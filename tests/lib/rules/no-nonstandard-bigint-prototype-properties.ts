"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-bigint-prototype-properties.js")
const {
    bigintPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-bigint-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...bigintPrototypeProperties].map((p) => `(123n).${p}`),
        { code: "(123n).unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "(123n).unknown()",
            errors: [
                "Non-standard 'BigInt.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "(123n).foo",
            errors: [
                "Non-standard 'BigInt.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "(123n).bar",
            errors: [
                "Non-standard 'BigInt.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "(123n)[0]",
            errors: [
                "Non-standard 'BigInt.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "(123n)['0']",
            errors: [
                "Non-standard 'BigInt.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "(123n)['01']",
            errors: [
                "Non-standard 'BigInt.prototype.01' property is forbidden.",
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
        ...[...bigintPrototypeProperties].map((p) => ({
            filename,
            code: `(123n).${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "(123n).foo",
            errors: [
                "Non-standard 'BigInt.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "(123n).bar",
            errors: [
                "Non-standard 'BigInt.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "(123n)[0]",
            errors: [
                "Non-standard 'BigInt.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "(123n)['0']",
            errors: [
                "Non-standard 'BigInt.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "(123n)['01']",
            errors: [
                "Non-standard 'BigInt.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = (123n); foo.foo",
            errors: [
                "Non-standard 'BigInt.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = BigInt(''); foo.bar",
            errors: [
                "Non-standard 'BigInt.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends bigint>(a: T) { a.baz }",
            errors: [
                "Non-standard 'BigInt.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
