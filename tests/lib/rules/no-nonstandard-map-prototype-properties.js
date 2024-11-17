"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-map-prototype-properties.js")
const {
    mapPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-map-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...mapPrototypeProperties].map((p) => `new Map().${p}`),
        { code: "new Map().unknown()", options: [{ allow: ["unknown"] }] },
    ],
    invalid: [
        {
            code: "new Map().unknown()",
            errors: [
                "Non-standard 'Map.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "new Map().foo",
            errors: ["Non-standard 'Map.prototype.foo' property is forbidden."],
        },
        {
            code: "new Map().bar",
            errors: ["Non-standard 'Map.prototype.bar' property is forbidden."],
        },
        {
            code: "new Map()[0]",
            errors: ["Non-standard 'Map.prototype.0' property is forbidden."],
        },
        {
            code: "new Map()['0']",
            errors: ["Non-standard 'Map.prototype.0' property is forbidden."],
        },
        {
            code: "new Map()['01']",
            errors: ["Non-standard 'Map.prototype.01' property is forbidden."],
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
        ...[...mapPrototypeProperties].map((p) => ({
            filename,
            code: `new Map().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "new Map().foo",
            errors: ["Non-standard 'Map.prototype.foo' property is forbidden."],
        },
        {
            filename,
            code: "new Map().bar",
            errors: ["Non-standard 'Map.prototype.bar' property is forbidden."],
        },
        {
            filename,
            code: "new Map()[0]",
            errors: ["Non-standard 'Map.prototype.0' property is forbidden."],
        },
        {
            filename,
            code: "new Map()['0']",
            errors: ["Non-standard 'Map.prototype.0' property is forbidden."],
        },
        {
            filename,
            code: "new Map()['01']",
            errors: ["Non-standard 'Map.prototype.01' property is forbidden."],
        },
        {
            filename,
            code: "let foo = new Map(); foo.foo",
            errors: ["Non-standard 'Map.prototype.foo' property is forbidden."],
        },
        {
            filename,
            code: "function f<T extends Map<any,any>>(a: T) { a.baz }",
            errors: ["Non-standard 'Map.prototype.baz' property is forbidden."],
        },
    ],
})
