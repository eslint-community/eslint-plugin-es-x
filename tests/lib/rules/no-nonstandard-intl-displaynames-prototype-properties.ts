"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-intl-displaynames-prototype-properties.js")
const {
    intlDisplayNamesPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-intl-displaynames-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...intlDisplayNamesPrototypeProperties].map(
            (p) => `new Intl.DisplayNames().${p}`,
        ),
        {
            code: "new Intl.DisplayNames().unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "new Intl.DisplayNames().unknown()",
            errors: [
                "Non-standard 'Intl.DisplayNames.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "new Intl.DisplayNames().foo",
            errors: [
                "Non-standard 'Intl.DisplayNames.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "new Intl.DisplayNames().bar",
            errors: [
                "Non-standard 'Intl.DisplayNames.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "new Intl.DisplayNames()[0]",
            errors: [
                "Non-standard 'Intl.DisplayNames.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new Intl.DisplayNames()['0']",
            errors: [
                "Non-standard 'Intl.DisplayNames.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new Intl.DisplayNames()['01']",
            errors: [
                "Non-standard 'Intl.DisplayNames.prototype.01' property is forbidden.",
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
        ...[...intlDisplayNamesPrototypeProperties].map((p) => ({
            filename,
            code: `new Intl.DisplayNames().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "new Intl.DisplayNames().foo",
            errors: [
                "Non-standard 'Intl.DisplayNames.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.DisplayNames().bar",
            errors: [
                "Non-standard 'Intl.DisplayNames.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.DisplayNames()[0]",
            errors: [
                "Non-standard 'Intl.DisplayNames.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.DisplayNames()['0']",
            errors: [
                "Non-standard 'Intl.DisplayNames.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.DisplayNames()['01']",
            errors: [
                "Non-standard 'Intl.DisplayNames.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new Intl.DisplayNames(); foo.foo",
            errors: [
                "Non-standard 'Intl.DisplayNames.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Intl.DisplayNames>(a: T) { a.baz }",
            errors: [
                "Non-standard 'Intl.DisplayNames.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
