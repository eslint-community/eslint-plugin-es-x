"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-dataview-prototype-properties.js")
const {
    dataViewPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-dataview-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...dataViewPrototypeProperties].map((p) => `new DataView().${p}`),
        { code: "new DataView().unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "new DataView().unknown()",
            errors: [
                "Non-standard 'DataView.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "new DataView().foo",
            errors: [
                "Non-standard 'DataView.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "new DataView().bar",
            errors: [
                "Non-standard 'DataView.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "new DataView()[0]",
            errors: [
                "Non-standard 'DataView.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new DataView()['0']",
            errors: [
                "Non-standard 'DataView.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new DataView()['01']",
            errors: [
                "Non-standard 'DataView.prototype.01' property is forbidden.",
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
        ...[...dataViewPrototypeProperties].map((p) => ({
            filename,
            code: `new DataView().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "new DataView().foo",
            errors: [
                "Non-standard 'DataView.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new DataView().bar",
            errors: [
                "Non-standard 'DataView.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new DataView()[0]",
            errors: [
                "Non-standard 'DataView.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new DataView()['0']",
            errors: [
                "Non-standard 'DataView.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new DataView()['01']",
            errors: [
                "Non-standard 'DataView.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new DataView(); foo.foo",
            errors: [
                "Non-standard 'DataView.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends DataView>(a: T) { a.baz }",
            errors: [
                "Non-standard 'DataView.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
