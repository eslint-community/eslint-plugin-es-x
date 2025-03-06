"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-nonstandard-string-prototype-properties.js")
const {
    stringPrototypeProperties,
} = require("../../../lib/util/well-known-properties")
const ruleId = "no-nonstandard-string-prototype-properties"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo",
        "foo.toString",
        "foo.foo",
        ...[...stringPrototypeProperties].map((p) => `'A'.${p}`),
        "'A'[0]",
        "'A'['0']",
        { code: "'A'.unknown()", options: [{ allow: ["unknown"] }] },
        {
            code: `
            const str = "str"
            if (String.prototype.unknown) {
                console.log(str.unknown())
            }`,
            options: [{ allowTestedProperty: true }],
        },
        {
            code: `
            const str = "str"
            if (String.prototype.unknown) {
                console.log(str.unknown.foo)
            }`,
            options: [{ allowTestedProperty: true }],
        },
        {
            code: `
            const str = "str"
            if (typeof str.unknown === 'string') {
                console.log(str.unknown)
            }`,
            options: [{ allowTestedProperty: true }],
        },
    ],
    invalid: [
        {
            code: "'A'.unknown()",
            errors: [
                "Non-standard 'String.prototype.unknown' property is forbidden.",
            ],
        },
        {
            code: "'123'.foo",
            errors: [
                "Non-standard 'String.prototype.foo' property is forbidden.",
            ],
        },
        {
            code: "'123'.bar",
            errors: [
                "Non-standard 'String.prototype.bar' property is forbidden.",
            ],
        },
        {
            code: "'123'['01']",
            errors: [
                "Non-standard 'String.prototype.01' property is forbidden.",
            ],
        },
        {
            code: `
            const str = "str"
            if (String.prototype.unknown) {
                console.log(str.unknown())
            }`,
            errors: 2,
        },
        {
            code: `
            const str = "str"
            if (String.prototype.unknown) {
                console.log(str.unknown.foo)
            }`,
            errors: 2,
        },
        {
            code: `
            const str = "str"
            if (String.prototype.unknown) {
                console.log(str.unknown.length)
            }`,
            errors: 2,
        },
        {
            code: `
            const str = "str"
            if (typeof str.unknown === 'string') {
                console.log(str.unknown)
            }`,
            errors: 2,
        },
        {
            code: `
            const str = "str"
            if (String.prototype.foo) {
                // OK
                console.log(str.foo())
            }
            if (String.prototype.foo) {
                // OK
                console.log(str.foo())
            } else {
                // NG
                console.log(str.foo())
            }
            if (!String.prototype.foo) {
                // NG
                console.log(str.foo())
            } else {
                // OK
                console.log(str.foo())
            }`,
            options: [{ allowTestedProperty: true }],
            errors: [
                {
                    line: 12,
                    message:
                        "Non-standard 'String.prototype.foo' property is forbidden.",
                },
                {
                    line: 16,
                    message:
                        "Non-standard 'String.prototype.foo' property is forbidden.",
                },
            ],
        },
        {
            code: `
            const str = "str"
            if (typeof String.prototype.foo !== 'undefined') {
                // OK
                console.log(str.foo())
            }
            if (typeof String.prototype.foo === 'undefined') {
                // NG
                console.log(str.foo())
            } else {
                // OK
                console.log(str.foo())
            }
            if (typeof String.prototype.foo === 'function') {
                // OK
                console.log(str.foo())
            } else {
                // NG
                console.log(str.foo())
            }`,
            options: [{ allowTestedProperty: true }],
            errors: [
                {
                    line: 9,
                    message:
                        "Non-standard 'String.prototype.foo' property is forbidden.",
                },
                {
                    line: 19,
                    message:
                        "Non-standard 'String.prototype.foo' property is forbidden.",
                },
            ],
        },
        {
            code: `
            const str = "str"
            const a = String.prototype.foo
              ? /* OK */ str.foo()
              : /* NG */ str.foo();
            const b = typeof String.prototype.foo === 'undefined'
              ? /* NG */ str.foo()
              : /* OK */ str.foo();`,
            options: [{ allowTestedProperty: true }],
            errors: [
                {
                    line: 5,
                    message:
                        "Non-standard 'String.prototype.foo' property is forbidden.",
                },
                {
                    line: 7,
                    message:
                        "Non-standard 'String.prototype.foo' property is forbidden.",
                },
            ],
        },
        {
            code: `
            const str1 = "str"
            const str2 = "str"
            const a = str1.foo
              ? /* OK */ str1.foo()
              : /* NG */ str1.foo();
            const b = str2.foo /* NG: Because it is ineffective as a guard */
              ? /* NG */ str1.foo()
              : /* NG */ str1.foo();`,
            options: [{ allowTestedProperty: true }],
            errors: [
                {
                    line: 6,
                    message:
                        "Non-standard 'String.prototype.foo' property is forbidden.",
                },
                {
                    line: 7,
                    message:
                        "Non-standard 'String.prototype.foo' property is forbidden.",
                },
                {
                    line: 8,
                    message:
                        "Non-standard 'String.prototype.foo' property is forbidden.",
                },
                {
                    line: 9,
                    message:
                        "Non-standard 'String.prototype.foo' property is forbidden.",
                },
            ],
        },
        {
            code: `
            const str = "str"
            function foo() {
                if (!String.prototype.foo) {
                    // NG: Should use polyfills
                    return str.foo()
                }
                return str.foo()
            }`,
            options: [{ allowTestedProperty: true }],
            errors: [
                {
                    line: 6,
                    message:
                        "Non-standard 'String.prototype.foo' property is forbidden.",
                },
            ],
        },
        {
            code: `
            const str = "str"
            if (String.prototype.foo) {
                // NG: 
                // The property is not called, the property may have a falsy value and so the check cannot be excluded.
                console.log(str.foo)
            }`,
            options: [{ allowTestedProperty: true }],
            errors: [
                {
                    line: 3,
                    message:
                        "Non-standard 'String.prototype.foo' property is forbidden.",
                },
                {
                    line: 6,
                    message:
                        "Non-standard 'String.prototype.foo' property is forbidden.",
                },
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
        ...[...stringPrototypeProperties].map((p) => ({
            filename,
            code: `'A'.${p}`,
        })),
        { filename, code: "'A'[0]" },
        { filename, code: "'A'['0']" },
    ],
    invalid: [
        {
            filename,
            code: "'123'.foo",
            errors: [
                "Non-standard 'String.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "'123'.bar",
            errors: [
                "Non-standard 'String.prototype.bar' property is forbidden.",
            ],
        },
        {
            filename,
            code: "'123'['01']",
            errors: [
                "Non-standard 'String.prototype.01' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = 'str'; foo.foo",
            errors: [
                "Non-standard 'String.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = String(42); foo.foo",
            errors: [
                "Non-standard 'String.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends string>(a: T) { a.foo }",
            errors: [
                "Non-standard 'String.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends 'a' | 'b'>(a: T) { a.foo }",
            errors: [
                "Non-standard 'String.prototype.foo' property is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends 'a' | 'b' | 'c'>(a: T) { a.foo }",
            errors: [
                "Non-standard 'String.prototype.foo' property is forbidden.",
            ],
        },
    ],
})
