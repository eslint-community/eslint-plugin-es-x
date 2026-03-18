"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-disposablestack-prototype-properties.js")
const {
    disposableStackPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-disposablestack-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...disposableStackPrototypeProperties].map(
            (p) => `(new DisposableStack()).${p}`,
        ),
        {
            code: "(new DisposableStack()).unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "(new DisposableStack()).unknown()",
            errors: [
                "Non-standard 'DisposableStack.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "(new DisposableStack()).foo",
            errors: [
                "Non-standard 'DisposableStack.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "(new DisposableStack())[0]",
            errors: [
                "Non-standard 'DisposableStack.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "(new DisposableStack())['01']",
            errors: [
                "Non-standard 'DisposableStack.prototype.01' property is forbidden.",
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
}).run(
    "no-nonstandard-disposablestack-prototype-properties TS Full Type Information",
    rule,
    {
        valid: [
            { filename, code: "foo" },
            { filename, code: "foo.toString" },
            { filename, code: "foo.foo" },
            { filename, code: "let foo = {}; foo.foo" },
            ...[...disposableStackPrototypeProperties].map((p) => ({
                filename,
                code: `(new DisposableStack()).${p}`,
            })),
        ],
        invalid: [
            {
                filename,
                code: "(new DisposableStack()).foo",
                errors: [
                    "Non-standard 'DisposableStack.prototype.foo' property is forbidden.",
                ],
            },
            {
                filename,
                code: "(new DisposableStack())[0]",
                errors: [
                    "Non-standard 'DisposableStack.prototype.0' property is forbidden.",
                ],
            },
            {
                filename,
                code: "(new DisposableStack())['01']",
                errors: [
                    "Non-standard 'DisposableStack.prototype.01' property is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = (new DisposableStack()); foo.foo",
                errors: [
                    "Non-standard 'DisposableStack.prototype.foo' property is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends DisposableStack>(a: T) { a.baz }",
                errors: [
                    "Non-standard 'DisposableStack.prototype.baz' property is forbidden.",
                ],
            },
        ],
    },
)
