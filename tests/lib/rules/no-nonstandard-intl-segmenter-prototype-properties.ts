"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-intl-segmenter-prototype-properties.js")
const {
    intlSegmenterPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-intl-segmenter-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...intlSegmenterPrototypeProperties].map(
            (p) => `new Intl.Segmenter().${p}`,
        ),
        {
            code: "new Intl.Segmenter().unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "new Intl.Segmenter().unknown()",
            errors: [
                "Non-standard 'Intl.Segmenter.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "new Intl.Segmenter().foo",
            errors: [
                "Non-standard 'Intl.Segmenter.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "new Intl.Segmenter().bar",
            errors: [
                "Non-standard 'Intl.Segmenter.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "new Intl.Segmenter()[0]",
            errors: [
                "Non-standard 'Intl.Segmenter.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new Intl.Segmenter()['0']",
            errors: [
                "Non-standard 'Intl.Segmenter.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new Intl.Segmenter()['01']",
            errors: [
                "Non-standard 'Intl.Segmenter.prototype.01' property is forbidden.",
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
        ...[...intlSegmenterPrototypeProperties].map((p) => ({
            filename,
            code: `new Intl.Segmenter().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "new Intl.Segmenter().foo",
            errors: [
                "Non-standard 'Intl.Segmenter.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.Segmenter().bar",
            errors: [
                "Non-standard 'Intl.Segmenter.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.Segmenter()[0]",
            errors: [
                "Non-standard 'Intl.Segmenter.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.Segmenter()['0']",
            errors: [
                "Non-standard 'Intl.Segmenter.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.Segmenter()['01']",
            errors: [
                "Non-standard 'Intl.Segmenter.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new Intl.Segmenter(); foo.foo",
            errors: [
                "Non-standard 'Intl.Segmenter.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Intl.Segmenter>(a: T) { a.baz }",
            errors: [
                "Non-standard 'Intl.Segmenter.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
