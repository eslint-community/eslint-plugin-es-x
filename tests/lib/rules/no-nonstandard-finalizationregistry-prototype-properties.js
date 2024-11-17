"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-finalizationregistry-prototype-properties.js")
const {
    finalizationRegistryPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-finalizationregistry-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...finalizationRegistryPrototypeProperties].map(
            (p) => `new FinalizationRegistry().${p}`,
        ),
        {
            code: "new FinalizationRegistry().unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "new FinalizationRegistry().unknown()",
            errors: [
                "Non-standard 'FinalizationRegistry.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "new FinalizationRegistry().foo",
            errors: [
                "Non-standard 'FinalizationRegistry.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "new FinalizationRegistry().bar",
            errors: [
                "Non-standard 'FinalizationRegistry.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "new FinalizationRegistry()[0]",
            errors: [
                "Non-standard 'FinalizationRegistry.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new FinalizationRegistry()['0']",
            errors: [
                "Non-standard 'FinalizationRegistry.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new FinalizationRegistry()['01']",
            errors: [
                "Non-standard 'FinalizationRegistry.prototype.01' property is forbidden.",
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
        ...[...finalizationRegistryPrototypeProperties].map((p) => ({
            filename,
            code: `new FinalizationRegistry().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "new FinalizationRegistry().foo",
            errors: [
                "Non-standard 'FinalizationRegistry.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new FinalizationRegistry().bar",
            errors: [
                "Non-standard 'FinalizationRegistry.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new FinalizationRegistry()[0]",
            errors: [
                "Non-standard 'FinalizationRegistry.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new FinalizationRegistry()['0']",
            errors: [
                "Non-standard 'FinalizationRegistry.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new FinalizationRegistry()['01']",
            errors: [
                "Non-standard 'FinalizationRegistry.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new FinalizationRegistry(); foo.foo",
            errors: [
                "Non-standard 'FinalizationRegistry.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends FinalizationRegistry<any>>(a: T) { a.baz }",
            errors: [
                "Non-standard 'FinalizationRegistry.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
