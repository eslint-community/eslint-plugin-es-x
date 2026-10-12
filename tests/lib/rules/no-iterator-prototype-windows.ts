import * as path from "node:path"
import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-iterator-prototype-windows.ts"
const ruleId = "no-iterator-prototype-windows"

new RuleTester({
    languageOptions: { globals: { Iterator: "readonly" } },
}).run(ruleId, rule, {
    valid: [
        "windows(2)",
        "foo.windows(2)",
        "Iterator.from(foo).map(n => n * 2)",
        "({ windows() {} }).windows(2)",
        "async function* foo() {}; foo().windows(2)",
        "let Iterator = { from() { return { windows() {} } } }; Iterator.from(foo).windows(2)",
        {
            code: "foo.windows(2)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "const iterator = Iterator.from(foo); if (typeof iterator.windows === 'function') iterator.windows(2)",
            options: [{ allowTestedProperty: true }],
        },
        {
            code: "const iterator = Iterator.from(foo); if (typeof iterator.windows === 'function') iterator.windows(2)",
            settings: { "es-x": { allowTestedProperty: true } },
        },
    ],
    invalid: [
        {
            code: "Iterator.prototype.windows",
            errors: [
                "ES2027 'Iterator.prototype.windows' method is forbidden.",
            ],
        },
        {
            code: "Iterator.from(foo).windows(2)",
            errors: [
                "ES2027 'Iterator.prototype.windows' method is forbidden.",
            ],
        },
        {
            code: "const iterator = Iterator.from(foo); iterator.windows(2, 'allow-partial')",
            errors: [
                "ES2027 'Iterator.prototype.windows' method is forbidden.",
            ],
        },
        {
            code: "[].values().windows(2)",
            errors: [
                "ES2027 'Iterator.prototype.windows' method is forbidden.",
            ],
        },
        {
            code: "function* foo() {}; foo().windows(2)",
            errors: [
                "ES2027 'Iterator.prototype.windows' method is forbidden.",
            ],
        },
        {
            code: "Iterator.from(foo).map(n => n * 2).windows(2)",
            errors: [
                "ES2027 'Iterator.prototype.windows' method is forbidden.",
            ],
        },
        {
            code: "Iterator.from(foo)['windows'](2)",
            errors: [
                "ES2027 'Iterator.prototype.windows' method is forbidden.",
            ],
        },
        {
            code: "const { windows } = Iterator.from(foo)",
            errors: [
                "ES2027 'Iterator.prototype.windows' method is forbidden.",
            ],
        },
        {
            code: "foo.windows(2)",
            errors: [
                "ES2027 'Iterator.prototype.windows' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.windows(2)",
            options: [{ aggressive: true }],
            errors: [
                "ES2027 'Iterator.prototype.windows' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: "const iterator = Iterator.from(foo); if (typeof iterator.windows === 'function') iterator.windows(2)",
            options: [{ allowTestedProperty: false }],
            errors: [
                "ES2027 'Iterator.prototype.windows' method is forbidden.",
                "ES2027 'Iterator.prototype.windows' method is forbidden.",
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
        { filename, code: "foo.windows(2)" },
        { filename, code: "({ windows() {} }).windows(2)" },
        {
            filename,
            code: "function f(a: { windows(size: number): void }) { a.windows(2) }",
        },
    ],
    invalid: [
        {
            filename,
            code: "function f(a: Iterator<number>) { a.windows(2) }",
            errors: [
                "ES2027 'Iterator.prototype.windows' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends Iterator<number>>(a: T) { a.windows(2) }",
            errors: [
                "ES2027 'Iterator.prototype.windows' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f(a: IteratorObject<number>) { a.windows(2) }",
            errors: [
                "ES2027 'Iterator.prototype.windows' method is forbidden.",
            ],
        },
        {
            filename,
            code: "const { windows } = Iterator.from(foo)",
            errors: [
                "ES2027 'Iterator.prototype.windows' method is forbidden.",
            ],
        },
    ],
})
