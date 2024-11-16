"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-intl-collator-prototype-properties.js")
const {
    intlCollatorPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-intl-collator-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...intlCollatorPrototypeProperties].map(
            (p) => `new Intl.Collator().${p}`,
        ),
        {
            code: "new Intl.Collator().unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "new Intl.Collator().unknown()",
            errors: [
                "Non-standard 'Intl.Collator.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "new Intl.Collator().foo",
            errors: [
                "Non-standard 'Intl.Collator.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "new Intl.Collator().bar",
            errors: [
                "Non-standard 'Intl.Collator.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "new Intl.Collator()[0]",
            errors: [
                "Non-standard 'Intl.Collator.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new Intl.Collator()['0']",
            errors: [
                "Non-standard 'Intl.Collator.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "new Intl.Collator()['01']",
            errors: [
                "Non-standard 'Intl.Collator.prototype.01' property is forbidden.",
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
        ...[...intlCollatorPrototypeProperties].map((p) => ({
            filename,
            code: `new Intl.Collator().${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "new Intl.Collator().foo",
            errors: [
                "Non-standard 'Intl.Collator.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.Collator().bar",
            errors: [
                "Non-standard 'Intl.Collator.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.Collator()[0]",
            errors: [
                "Non-standard 'Intl.Collator.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.Collator()['0']",
            errors: [
                "Non-standard 'Intl.Collator.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "new Intl.Collator()['01']",
            errors: [
                "Non-standard 'Intl.Collator.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = new Intl.Collator(); foo.foo",
            errors: [
                "Non-standard 'Intl.Collator.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Intl.Collator>(a: T) { a.baz }",
            errors: [
                "Non-standard 'Intl.Collator.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
