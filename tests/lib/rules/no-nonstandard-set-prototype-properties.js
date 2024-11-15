"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-set-prototype-properties.js")
const {
    setPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-set-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...setPrototypeProperties].map((p) => `new Set().${p}`),
        { code: "new Set().unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "new Set().unknown()",
            errors: [
                "Non-standard 'Set.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "new Set().foo",
            errors: ["Non-standard 'Set.prototype.foo' property is forbidden."],
        },
        {
            code: "new Set().bar",
            errors: ["Non-standard 'Set.prototype.bar' property is forbidden."],
        },
        {
            code: "new Set()[0]",
            errors: ["Non-standard 'Set.prototype.0' property is forbidden."],
        },
        {
            code: "new Set()['0']",
            errors: ["Non-standard 'Set.prototype.0' property is forbidden."],
        },
        {
            code: "new Set()['01']",
            errors: ["Non-standard 'Set.prototype.01' property is forbidden."],
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
        ...[...setPrototypeProperties].map((p) => ({
            filename,
            code: `new Set().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "new Set().foo",
            errors: ["Non-standard 'Set.prototype.foo' property is forbidden."],
        },
        {
            filename,
            code: "new Set().bar",
            errors: ["Non-standard 'Set.prototype.bar' property is forbidden."],
        },
        {
            filename,
            code: "new Set()[0]",
            errors: ["Non-standard 'Set.prototype.0' property is forbidden."],
        },
        {
            filename,
            code: "new Set()['0']",
            errors: ["Non-standard 'Set.prototype.0' property is forbidden."],
        },
        {
            filename,
            code: "new Set()['01']",
            errors: ["Non-standard 'Set.prototype.01' property is forbidden."],
        },
        {
            filename,
            code: "let foo = new Set(); foo.foo",
            errors: ["Non-standard 'Set.prototype.foo' property is forbidden."],
        },
        {
            filename,
            code: "function f<T extends Set<any>>(a: T) { a.baz }",
            errors: ["Non-standard 'Set.prototype.baz' property is forbidden."],
        },
    ],
})
