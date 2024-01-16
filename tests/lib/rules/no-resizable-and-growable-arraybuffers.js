"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-resizable-and-growable-arraybuffers.js")
const ruleId = "no-resizable-and-growable-arraybuffers"

const testerOptions = {
    languageOptions: {
        globals: {
            ArrayBuffer: false,
            SharedArrayBuffer: false,
            window: false,
        },
    },
}
new RuleTester(testerOptions).run(ruleId, rule, {
    valid: [
        "new ArrayBuffer(8);",
        "new SharedArrayBuffer(1024);",
        "resize(8); grow(8);",
        "foo.reverse()",
        "foo.resize(8); foo.grow(8);",
        {
            code: "resize(8); grow(8);",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.reverse()", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.resize(8); foo.grow(8);",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "const buffer = new ArrayBuffer(8, { maxByteLength: 16 });",
            errors: [
                {
                    message: "ES2024 Resizable ArrayBuffer is forbidden.",
                    line: 1,
                    column: 35,
                },
            ],
        },
        {
            code: "const buffer = new SharedArrayBuffer(8, { maxByteLength: 16 });",
            errors: [
                {
                    message: "ES2024 Growable SharedArrayBuffer is forbidden.",
                    line: 1,
                    column: 41,
                },
            ],
        },
        {
            code: "const buffer = new window.ArrayBuffer(8, { maxByteLength: 16 });",
            errors: [
                {
                    message: "ES2024 Resizable ArrayBuffer is forbidden.",
                    line: 1,
                    column: 42,
                },
            ],
        },
        {
            code: "const buffer = new ArrayBuffer(8, { maxByteLength: 16 }); buffer.resize(8)",
            errors: [
                {
                    message: "ES2024 Resizable ArrayBuffer is forbidden.",
                    line: 1,
                    column: 35,
                },
                {
                    message: "ES2024 Resizable ArrayBuffer is forbidden.",
                    line: 1,
                    column: 59,
                },
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "const buffer = new SharedArrayBuffer(8, { maxByteLength: 16 }); buffer.grow(8)",
            options: [{ aggressive: true }],
            errors: [
                {
                    message: "ES2024 Growable SharedArrayBuffer is forbidden.",
                    line: 1,
                    column: 41,
                },
                {
                    message: "ES2024 Growable SharedArrayBuffer is forbidden.",
                    line: 1,
                    column: 65,
                },
            ],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: `
            const buffer = new ArrayBuffer(8, { maxByteLength: 16 });
            console.log(buffer.maxByteLength);
            console.log(buffer.resizable);`,
            errors: [
                {
                    message: "ES2024 Resizable ArrayBuffer is forbidden.",
                    line: 2,
                    column: 47,
                },
                {
                    message: "ES2024 Resizable ArrayBuffer is forbidden.",
                    line: 3,
                    column: 25,
                },
                {
                    message: "ES2024 Resizable ArrayBuffer is forbidden.",
                    line: 4,
                    column: 25,
                },
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: `
            const buffer = new SharedArrayBuffer(8, { maxByteLength: 16 });
            console.log(buffer.maxByteLength);
            console.log(buffer.growable);`,
            errors: [
                {
                    message: "ES2024 Growable SharedArrayBuffer is forbidden.",
                    line: 2,
                    column: 53,
                },
                {
                    message: "ES2024 Resizable ArrayBuffer is forbidden.",
                    line: 3,
                    column: 25,
                },
                {
                    message: "ES2024 Growable SharedArrayBuffer is forbidden.",
                    line: 4,
                    column: 25,
                },
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})

const parser = require("@typescript-eslint/parser")
const tsconfigRootDir = path.resolve(__dirname, "../../fixtures")
const project = "tsconfig.json"
const filename = path.join(tsconfigRootDir, "test.ts")

new RuleTester({
    ...testerOptions,
    languageOptions: {
        ...testerOptions.languageOptions,
        parser,
        parserOptions: { tsconfigRootDir, project },
    },
}).run(`${ruleId} TS Full Type Information`, rule, {
    valid: [
        { filename, code: "resize(8); grow(8);" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.resize(8); foo.grow(8);" },
        { filename, code: "let foo = {}; foo.resize(8); foo.grow(8);" },
        {
            filename,
            code: "resize(8); grow(8);",
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.reverse()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "function fn(a: any) { a.resize(8) }",
        },
        {
            filename,
            code: "function fn(a: any) { console.log(a.resizable) }",
        },
        {
            filename,
            code: "function fn(a: any) { console.log(a.maxByteLength) }",
        },
        {
            filename,
            code: "function fn(a: any) { a.grow(8) }",
        },
        {
            filename,
            code: "function fn(a: any) { console.log(a.growable) }",
        },
    ],
    invalid: [
        {
            filename,
            code: "function fn(a: ArrayBuffer) { a.resize(8) }",
            errors: ["ES2024 Resizable ArrayBuffer is forbidden."],
        },
        {
            filename,
            code: "function fn(a: ArrayBuffer) { console.log(a.resizable) }",
            errors: ["ES2024 Resizable ArrayBuffer is forbidden."],
        },
        {
            filename,
            code: "function fn(a: ArrayBuffer) { console.log(a.maxByteLength) }",
            errors: ["ES2024 Resizable ArrayBuffer is forbidden."],
        },
        {
            filename,
            code: "function fn(a: SharedArrayBuffer) { a.grow(8) }",
            errors: ["ES2024 Growable SharedArrayBuffer is forbidden."],
        },
        {
            filename,
            code: "function fn(a: SharedArrayBuffer) { console.log(a.growable) }",
            errors: ["ES2024 Growable SharedArrayBuffer is forbidden."],
        },
        {
            filename,
            code: "function fn(a: SharedArrayBuffer) { console.log(a.maxByteLength) }",
            errors: ["ES2024 Growable SharedArrayBuffer is forbidden."],
        },
    ],
})
