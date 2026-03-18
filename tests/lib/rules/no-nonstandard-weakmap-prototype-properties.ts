"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-weakmap-prototype-properties.js")
const {
    weakMapPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-weakmap-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...weakMapPrototypeProperties].map((p) => `new WeakMap().${p}`),
        { code: "new WeakMap().unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "new WeakMap().unknown()",
            errors: [
                "Non-standard 'WeakMap.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "new WeakMap().foo",
            errors: [
                "Non-standard 'WeakMap.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "new WeakMap().bar",
            errors: [
                "Non-standard 'WeakMap.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "new WeakMap()[0]",
            errors: [
                "Non-standard 'WeakMap.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new WeakMap()['0']",
            errors: [
                "Non-standard 'WeakMap.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new WeakMap()['01']",
            errors: [
                "Non-standard 'WeakMap.prototype.01' property is forbidden.",
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
        ...[...weakMapPrototypeProperties].map((p) => ({
            filename,
            code: `new WeakMap().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "new WeakMap().foo",
            errors: [
                "Non-standard 'WeakMap.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new WeakMap().bar",
            errors: [
                "Non-standard 'WeakMap.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new WeakMap()[0]",
            errors: [
                "Non-standard 'WeakMap.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new WeakMap()['0']",
            errors: [
                "Non-standard 'WeakMap.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new WeakMap()['01']",
            errors: [
                "Non-standard 'WeakMap.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new WeakMap(); foo.foo",
            errors: [
                "Non-standard 'WeakMap.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends WeakMap<any, any>>(a: T) { a.baz }",
            errors: [
                "Non-standard 'WeakMap.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
