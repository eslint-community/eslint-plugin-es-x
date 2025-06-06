"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-asyncdisposablestack-prototype-properties.js")
const {
    asyncDisposableStackPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-asyncdisposablestack-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...asyncDisposableStackPrototypeProperties].map(
            (p) => `(new AsyncDisposableStack()).${p}`,
        ),
        {
            code: "(new AsyncDisposableStack()).unknown()",
            options: [{ allow: ["unknown"] }],
        },
    ],
    invalid: [
        {
            code: "(new AsyncDisposableStack()).unknown()",
            errors: [
                "Non-standard 'AsyncDisposableStack.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "(new AsyncDisposableStack()).foo",
            errors: [
                "Non-standard 'AsyncDisposableStack.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "(new AsyncDisposableStack())[0]",
            errors: [
                "Non-standard 'AsyncDisposableStack.prototype.0' property is forbidden.",
            ],
        },
        {
            code: "(new AsyncDisposableStack())['01']",
            errors: [
                "Non-standard 'AsyncDisposableStack.prototype.01' property is forbidden.",
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
    "no-nonstandard-asyncdisposablestack-prototype-properties TS Full Type Information",
    rule,
    {
        valid: [
            { filename, code: "foo" },
            { filename, code: "foo.toString" },
            { filename, code: "foo.foo" },
            { filename, code: "let foo = {}; foo.foo" },
            ...[...asyncDisposableStackPrototypeProperties].map((p) => ({
                filename,
                code: `(new AsyncDisposableStack()).${p}`,
            })),
        ],
        invalid: [
            {
                filename,
                code: "(new AsyncDisposableStack()).foo",
                errors: [
                    "Non-standard 'AsyncDisposableStack.prototype.foo' property is forbidden.",
                ],
            },
            {
                filename,
                code: "(new AsyncDisposableStack())[0]",
                errors: [
                    "Non-standard 'AsyncDisposableStack.prototype.0' property is forbidden.",
                ],
            },
            {
                filename,
                code: "(new AsyncDisposableStack())['01']",
                errors: [
                    "Non-standard 'AsyncDisposableStack.prototype.01' property is forbidden.",
                ],
            },
            {
                filename,
                code: "let foo = (new AsyncDisposableStack()); foo.foo",
                errors: [
                    "Non-standard 'AsyncDisposableStack.prototype.foo' property is forbidden.",
                ],
            },
            {
                filename,
                code: "function f<T extends AsyncDisposableStack>(a: T) { a.baz }",
                errors: [
                    "Non-standard 'AsyncDisposableStack.prototype.baz' property is forbidden.",
                ],
            },
        ],
    },
)
