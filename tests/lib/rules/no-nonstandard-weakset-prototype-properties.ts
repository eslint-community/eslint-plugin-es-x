"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-weakset-prototype-properties.js")
const {
    weakSetPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-weakset-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...weakSetPrototypeProperties].map((p) => `new WeakSet().${p}`),
        { code: "new WeakSet().unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "new WeakSet().unknown()",
            errors: [
                "Non-standard 'WeakSet.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "new WeakSet().foo",
            errors: [
                "Non-standard 'WeakSet.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "new WeakSet().bar",
            errors: [
                "Non-standard 'WeakSet.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "new WeakSet()[0]",
            errors: [
                "Non-standard 'WeakSet.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new WeakSet()['0']",
            errors: [
                "Non-standard 'WeakSet.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new WeakSet()['01']",
            errors: [
                "Non-standard 'WeakSet.prototype.01' property is forbidden.",
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
        ...[...weakSetPrototypeProperties].map((p) => ({
            filename,
            code: `new WeakSet().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "new WeakSet().foo",
            errors: [
                "Non-standard 'WeakSet.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new WeakSet().bar",
            errors: [
                "Non-standard 'WeakSet.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new WeakSet()[0]",
            errors: [
                "Non-standard 'WeakSet.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new WeakSet()['0']",
            errors: [
                "Non-standard 'WeakSet.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new WeakSet()['01']",
            errors: [
                "Non-standard 'WeakSet.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new WeakSet(); foo.foo",
            errors: [
                "Non-standard 'WeakSet.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends WeakSet<any>>(a: T) { a.baz }",
            errors: [
                "Non-standard 'WeakSet.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
