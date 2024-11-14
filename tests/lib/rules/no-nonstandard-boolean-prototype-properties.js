"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-boolean-prototype-properties.js")
const {
    booleanPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-boolean-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...booleanPrototypeProperties].map((p) => `true.${p}`),
        { code: "true.unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "true.unknown()",
            errors: [
                "Non-standard 'Boolean.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "true.foo",
            errors: [
                "Non-standard 'Boolean.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "true.bar",
            errors: [
                "Non-standard 'Boolean.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "true[0]",
            errors: [
                "Non-standard 'Boolean.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "true['0']",
            errors: [
                "Non-standard 'Boolean.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "true['01']",
            errors: [
                "Non-standard 'Boolean.prototype.01' property is forbidden.",
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
        ...[...booleanPrototypeProperties].map((p) => ({
            filename,
            code: `true.${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "true.foo",
            errors: [
                "Non-standard 'Boolean.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "true.bar",
            errors: [
                "Non-standard 'Boolean.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "true[0]",
            errors: [
                "Non-standard 'Boolean.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "true['0']",
            errors: [
                "Non-standard 'Boolean.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "true['01']",
            errors: [
                "Non-standard 'Boolean.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = true; foo.foo",
            errors: [
                "Non-standard 'Boolean.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = Boolean(''); foo.bar",
            errors: [
                "Non-standard 'Boolean.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends boolean>(a: T) { a.baz }",
            errors: [
                "Non-standard 'Boolean.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
