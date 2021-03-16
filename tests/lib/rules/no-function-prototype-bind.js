/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-function-prototype-bind.js")
const ruleId = "no-function-prototype-bind"

new RuleTester().run(ruleId, rule, {
    valid: [
        "bind(this)",
        "foo.bind(this)",
        "(function fn(){}).name",
        "(()=>{}).name",
        { code: "bind(this)", settings: { es: { aggressive: true } } },
        {
            code: "(function fn(){}).name",
            settings: { es: { aggressive: true } },
        },
        { code: "(()=>{}).name", settings: { es: { aggressive: true } } },
        {
            code: "foo.bind(this)",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
        {
            code: "(function fn(){}).name",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
        {
            code: "(()=>{}).name",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "(function fn(){}).bind(this)",
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
        },
        {
            code: "(()=>{}).bind(this)",
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
        },
        {
            code: "foo.bind(this)",
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "(function fn(){}).bind(this)",
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "(()=>{}).bind(this)",
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.bind(this)",
            options: [{ aggressive: true }],
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            settings: { es: { aggressive: false } },
        },
        {
            code: "(function fn(){}).bind(this)",
            options: [{ aggressive: true }],
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            settings: { es: { aggressive: false } },
        },
        {
            code: "(()=>{}).bind(this)",
            options: [{ aggressive: true }],
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            settings: { es: { aggressive: false } },
        },
    ],
})

// -----------------------------------------------------------------------------
// TypeScript
// -----------------------------------------------------------------------------
const parser = require.resolve("@typescript-eslint/parser")
const tsconfigRootDir = path.resolve(__dirname, "../../fixtures")
const project = "tsconfig.json"
const filename = path.join(tsconfigRootDir, "test.ts")

new RuleTester({ parser }).run(`${ruleId} TS`, rule, {
    valid: [
        "bind(this)",
        "foo.bind(this)",
        "(function fn(){}).name",
        "(()=>{}).name",
        "let foo = {}; foo.bind(this)",
        {
            code: "bind(this)",
            settings: { es: { aggressive: true } },
        },

        // `Function` is unknown type if tsconfig.json is not configured.
        "Object.assign.bind(this)",
        "let foo = Function(); foo.bind(this)",
        "let foo = String; foo.bind(this)",
    ],
    invalid: [
        {
            code: "(function fn(){}).bind(this)",
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
        },
        {
            code: "(()=>{}).bind(this)",
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
        },
        {
            code: "let foo = function () {} ; foo.bind(this)",
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
        },
        {
            code: "let foo = () => {} ; foo.bind(this)",
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
        },
        {
            code: "function foo () {} ; foo.bind(this)",
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
        },
        {
            code: "function f(a: () => number) { a.bind(this) }",
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
        },
        {
            code: "let foo = { fn () {} } ; foo.fn.bind(this)",
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
        },
        {
            code: "class Foo {fn()}; const foo = new Foo(); foo.fn.bind(this)",
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
        },
        {
            code:
                "function f<T extends ((a: any) => T)>(a: T) { a.bind(this) }",
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
        },
        {
            code:
                "function f<T extends ((a: any) => T) | 'union'>(a: T) { a.bind(this) }",
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
        },
        {
            code: "Object.assign.bind(this)",
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "let foo = Function(); foo.bind(this)",
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "let foo = String; foo.bind(this)",
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.bind(this)",
            errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            settings: { es: { aggressive: true } },
        },
    ],
})

new RuleTester({ parser, parserOptions: { tsconfigRootDir, project } }).run(
    `${ruleId} TS Full Types`,
    rule,
    {
        valid: [
            { filename, code: "bind(this)" },
            { filename, code: "foo.bind(this)" },
            { filename, code: "(function fn(){}).name" },
            { filename, code: "(()=>{}).name" },
            { filename, code: "let foo = {}; foo.bind(this)" },
            {
                filename,
                code: "bind(this)",
                settings: { es: { aggressive: true } },
            },
        ],
        invalid: [
            {
                filename,
                code: "(function fn(){}).bind(this)",
                errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            },
            {
                filename,
                code: "(()=>{}).bind(this)",
                errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            },
            {
                filename,
                code: "let foo = function () {} ; foo.bind(this)",
                errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            },
            {
                filename,
                code: "let foo = () => {} ; foo.bind(this)",
                errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            },
            {
                filename,
                code: "function foo () {} ; foo.bind(this)",
                errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            },
            {
                filename,
                code: "function f(a: () => number) { a.bind(this) }",
                errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            },
            {
                filename,
                code: "let foo = { fn () {} } ; foo.fn.bind(this)",
                errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            },
            {
                filename,
                code: "Object.assign.bind(this)",
                errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            },
            {
                filename,
                code:
                    "class Foo {fn()}; const foo = new Foo(); foo.fn.bind(this)",
                errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            },
            {
                filename,
                code: "let foo = Function(); foo.bind(this)",
                errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            },
            {
                filename,
                code: "let foo = String; foo.bind(this)",
                errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            },
            {
                filename,
                code:
                    "function f<T extends ((a: any) => T)>(a: T) { a.bind(this) }",
                errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            },
            {
                filename,
                code:
                    "function f<T extends ((a: any) => T) | 'union'>(a: T) { a.bind(this) }",
                errors: ["ES5 'Function.prototype.bind' method is forbidden."],
            },
            {
                filename,
                code: "foo.bind(this)",
                errors: ["ES5 'Function.prototype.bind' method is forbidden."],
                settings: { es: { aggressive: true } },
            },
        ],
    },
)
