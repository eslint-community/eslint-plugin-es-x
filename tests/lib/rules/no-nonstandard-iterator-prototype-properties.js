"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-iterator-prototype-properties.js")
const {
    iteratorPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-iterator-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        "[].keys().next()",
        "[].keys().return()",
        "[].keys().throw()",
        ...[...iteratorPrototypeProperties].map(
            (p) => `Iterator.from({}).${p}`,
        ),
        {
            code: "Iterator.from({}).unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "Iterator.from({}).unknown()",
            errors: [
                "Non-standard 'Iterator.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "Iterator.from({}).foo",
            errors: [
                "Non-standard 'Iterator.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "Iterator.from({}).bar",
            errors: [
                "Non-standard 'Iterator.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "Iterator.from({})[0]",
            errors: [
                "Non-standard 'Iterator.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "Iterator.from({})['0']",
            errors: [
                "Non-standard 'Iterator.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "Iterator.from({})['01']",
            errors: [
                "Non-standard 'Iterator.prototype.01' property is forbidden.",
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
        ...[...iteratorPrototypeProperties].map((p) => ({
            filename,
            code: `Iterator.from({}).${p}`,
        })),
    ],
    invalid: [
        {
            filename,
            code: "Iterator.from({}).foo",
            errors: [
                "Non-standard 'Iterator.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "Iterator.from({}).bar",
            errors: [
                "Non-standard 'Iterator.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "Iterator.from({})[0]",
            errors: [
                "Non-standard 'Iterator.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "Iterator.from({})['0']",
            errors: [
                "Non-standard 'Iterator.prototype.0' property is forbidden.",
            ],
        },
        {
            filename,
            code: "Iterator.from({})['01']",
            errors: [
                "Non-standard 'Iterator.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = Iterator.from({}); foo.foo",
            errors: [
                "Non-standard 'Iterator.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Iterator<any>>(a: T) { a.baz }",
            errors: [
                "Non-standard 'Iterator.prototype.baz' property is forbidden.",
            ],
        },
    ],
})
