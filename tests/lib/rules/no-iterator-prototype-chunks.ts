import * as path from "node:path"
import * as parser from "@typescript-eslint/parser"
import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-iterator-prototype-chunks.ts"

const ruleId = "no-iterator-prototype-chunks"
const message = "ES2027 'Iterator.prototype.chunks' method is forbidden."

new RuleTester({
    languageOptions: { globals: { Iterator: "readonly" } },
}).run(ruleId, rule, {
    valid: [
        "chunks(2)",
        "foo.chunks(2)",
        "({ chunks() {} }).chunks(2)",
        "[1, 2, 3].slice(0, 2)",
        "Iterator.from([1, 2, 3]).take(2)",
        "function f(Iterator) { Iterator.from([]).chunks(2) }",
        {
            code: "foo.chunks(2)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "const it = Iterator.from([]); if (typeof it.chunks === 'function') { it.chunks(2) }",
            options: [{ allowTestedProperty: true }],
        },
        {
            code: "Iterator.from([]).chunks?.(2)",
            options: [{ allowTestedProperty: true }],
        },
        {
            code: "const it = Iterator.from([]); if (typeof it.chunks === 'function') { it.chunks(2) }",
            settings: { "es-x": { allowTestedProperty: true } },
        },
    ],
    invalid: [
        { code: "Iterator.from([1, 2, 3]).chunks(2)", errors: [message] },
        { code: "[1, 2, 3].values().chunks(2)", errors: [message] },
        { code: "new Set([1, 2]).values().chunks(2)", errors: [message] },
        { code: "new Map().keys().chunks(2)", errors: [message] },
        { code: "Iterator.prototype.chunks", errors: [message] },
        { code: "Iterator.from([])['chunks'](2)", errors: [message] },
        {
            code: "const key = 'chunks'; Iterator.from([])[key](2)",
            errors: [message],
        },
        {
            code: "const it = Iterator.from([]); it.chunks(2)",
            errors: [message],
        },
        { code: "const { chunks } = Iterator.from([])", errors: [message] },
        {
            code: "let chunks; ({ chunks } = Iterator.from([]))",
            errors: [message],
        },
        {
            code: "function * values() { yield 1 }; values().chunks(2)",
            errors: [message],
        },
        {
            code: "Iterator.from([]).map(x => x).drop(1).chunks(2)",
            errors: [message],
        },
        { code: "Iterator.from([]).chunks?.(2)", errors: [message] },
        {
            code: "foo.chunks(2)",
            options: [{ aggressive: true }],
            errors: [message],
        },
        {
            code: "foo.chunks(2)",
            errors: [message],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.chunks(2)",
            options: [{ aggressive: true }],
            errors: [message],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: "const it = Iterator.from([]); if (typeof it.chunks === 'function') { it.chunks(2) }",
            options: [{ allowTestedProperty: false }],
            errors: [message, message],
            settings: { "es-x": { allowTestedProperty: true } },
        },
        {
            code: "const it = Iterator.from([]); if (typeof it.chunks === 'function') { it.take(2) }",
            options: [{ allowTestedProperty: true }],
            errors: [message],
        },
    ],
})

const tsconfigRootDir = path.resolve(import.meta.dirname, "../../fixtures")
const filename = path.join(tsconfigRootDir, "test.ts")

new RuleTester({
    languageOptions: {
        parser,
        parserOptions: {
            tsconfigRootDir,
            project: "tsconfig.json",
            disallowAutomaticSingleRunInference: true,
        },
    },
}).run(`${ruleId} TS Full Type Information`, rule, {
    valid: [
        {
            filename,
            code: "declare const value: { chunks(size: number): number[] }; value.chunks(2)",
        },
        { filename, code: "declare const value: number[]; value.slice(0, 2)" },
    ],
    invalid: [
        {
            filename,
            code: "declare const it: Iterator<number>; it.chunks(2)",
            errors: [message],
        },
        {
            filename,
            code: "declare const it: IteratorObject<number>; it.chunks(2)",
            errors: [message],
        },
        {
            filename,
            code: "function f<T extends Iterator<number>>(it: T) { it.chunks(2) }",
            errors: [message],
        },
        {
            filename,
            code: "const it: IteratorObject<number> = [1, 2, 3].values(); it.chunks(2)",
            errors: [message],
        },
    ],
})
