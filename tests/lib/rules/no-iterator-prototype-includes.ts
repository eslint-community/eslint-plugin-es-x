import * as path from "node:path"
import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-iterator-prototype-includes.ts"
const ruleId = "no-iterator-prototype-includes"

new RuleTester({
    languageOptions: { globals: { Iterator: "readonly" } },
}).run(ruleId, rule, {
    valid: [
        "includes(0)",
        "foo.includes(0)",
        "Iterator.from(foo).some(value => value === 0)",
        "[1, 2].includes(1)",
        "'hello'.includes('ell')",
        "new Uint8Array([1, 2]).includes(1)",
        ...[
            "[1, 2].includes(1)",
            "Array.prototype.includes.call([1, 2], 1)",
            "'hello'.includes('ell')",
            "String.prototype.includes.call('hello', 'ell')",
            "new Uint8Array([1, 2]).includes(1)",
        ].map((code) => ({
            code,
            settings: { "es-x": { aggressive: true } },
        })),
        {
            code: "foo.includes(0)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "const iterator = Iterator.from(foo); if (typeof iterator.includes === 'function') { iterator.includes(0) }",
            options: [{ allowTestedProperty: true }],
        },
        {
            code: "const iterator = Iterator.from(foo); if (typeof iterator.includes === 'function') { iterator.includes(0) }",
            settings: { "es-x": { allowTestedProperty: true } },
        },
    ],
    invalid: [
        ...[
            "Iterator.from(foo).includes(0)",
            "Iterator.from(foo).drop(1).includes(0)",
            "[1, 2].values().includes(1)",
            "new Set([1, 2]).values().includes(1)",
            "function* values() { yield 1 }; values().includes(1)",
            "const iterator = Iterator.from(foo); iterator.includes(0)",
            "Iterator.from(foo)['includes'](0)",
            "const key = 'includes'; Iterator.from(foo)[key](0)",
            "Iterator.from(foo)?.includes(0)",
            "Iterator.prototype.includes.call(Iterator.from(foo), 0)",
            "const { includes } = Iterator.from(foo)",
        ].map((code) => ({
            code,
            errors: [
                "ES2027 'Iterator.prototype.includes' method is forbidden.",
            ],
        })),
        {
            code: "foo.includes(0)",
            errors: [
                "ES2027 'Iterator.prototype.includes' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.includes(0)",
            options: [{ aggressive: true }],
            errors: [
                "ES2027 'Iterator.prototype.includes' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: "const iterator = Iterator.from(foo); if (typeof iterator.includes === 'function') { iterator.includes(0) }",
            errors: [
                "ES2027 'Iterator.prototype.includes' method is forbidden.",
                "ES2027 'Iterator.prototype.includes' method is forbidden.",
            ],
        },
        {
            code: "const iterator = Iterator.from(foo); if (typeof iterator.includes === 'function') { iterator.includes(0) }",
            options: [{ allowTestedProperty: false }],
            errors: [
                "ES2027 'Iterator.prototype.includes' method is forbidden.",
                "ES2027 'Iterator.prototype.includes' method is forbidden.",
            ],
            settings: { "es-x": { allowTestedProperty: true } },
        },
    ],
})

// -----------------------------------------------------------------------------
// TypeScript
// -----------------------------------------------------------------------------
import * as parser from "@typescript-eslint/parser"
const tsconfigRootDir = path.resolve(import.meta.dirname, "../../fixtures")
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
        ...[
            "function f(a: number[]) { a.includes(0) }",
            "function f(a: readonly number[]) { a.includes(0) }",
            "function f(a: string) { a.includes('x') }",
            "function f(a: Uint8Array) { a.includes(0) }",
            "function f(a: number[] | string) { a.includes(0) }",
        ].map((code) => ({
            filename,
            code,
            settings: { "es-x": { aggressive: true } },
        })),
        { filename, code: "foo.includes(0)" },
    ],
    invalid: [
        ...[
            "function f(a: Iterator<number>) { a.includes(0) }",
            "function f<T extends Iterator<number>>(a: T) { a.includes(0) }",
            "function f(a: IteratorObject<number>) { a.includes(0) }",
            "function f<T extends IteratorObject<number>>(a: T) { a.includes(0) }",
        ].map((code) => ({
            filename,
            code,
            errors: [
                "ES2027 'Iterator.prototype.includes' method is forbidden.",
            ],
        })),
    ],
})
