import * as path from "node:path"
import * as parser from "@typescript-eslint/parser"
import RuleTester from "../../tester.ts"
import rule from "../../../lib/rules/no-iterator-prototype-join.ts"

const ruleId = "no-iterator-prototype-join"
const errors = ["ES2027 'Iterator.prototype.join' method is forbidden."]

new RuleTester().run(ruleId, rule, {
    valid: [
        "join(',')",
        "foo.join(',')",
        "[1, 2].join(',')",
        "new Uint8Array([1, 2]).join(',')",
        "const array = [1, 2]; array.join(',')",
        "const object = { join() {} }; object.join(',')",
        "let Iterator = { from() { return [] } }; Iterator.from().join(',')",
        {
            code: "[1, 2].join(',')",
            options: [{ aggressive: true }],
        },
        {
            code: "new Uint8Array([1, 2]).join(',')",
            options: [{ aggressive: true }],
        },
        {
            code: "foo.join(',')",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "const iterator = Iterator.from([1, 2]); if (typeof iterator.join === 'function') { iterator.join(',') }",
            options: [{ allowTestedProperty: true }],
        },
    ],
    invalid: [
        { code: "Iterator.from([1, 2]).join(',')", errors },
        { code: "Iterator.prototype.join", errors },
        { code: "Iterator.from([1, 2])['join'](',')", errors },
        { code: "const key = 'join'; Iterator.from([1, 2])[key](',')", errors },
        {
            code: "const iterator = Iterator.from([1, 2]); iterator.join(',')",
            errors,
        },
        { code: "const { join } = Iterator.from([1, 2])", errors },
        { code: "function* values() { yield 1 }; values().join(',')", errors },
        { code: "[1, 2].values().join(',')", errors },
        { code: "new Set([1, 2]).values().join(',')", errors },
        {
            code: "Iterator.from([1, 2]).map(value => value * 2).join(',')",
            errors,
        },
        {
            code: "foo.join(',')",
            errors,
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.join(',')",
            options: [{ aggressive: true }],
            errors,
            settings: { "es-x": { aggressive: false } },
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
        { filename, code: "function f(array: number[]) { array.join(',') }" },
        { filename, code: "function f(array: Uint8Array) { array.join(',') }" },
        {
            filename,
            code: "function f(array: number[]) { array.join(',') }",
            options: [{ aggressive: true }],
        },
        {
            filename,
            code: "function f(object: { join(): string }) { object.join() }",
        },
    ],
    invalid: [
        {
            filename,
            code: "function f(iterator: Iterator<number>) { iterator.join(',') }",
            errors,
        },
        {
            filename,
            code: "function f<T extends Iterator<number>>(iterator: T) { iterator.join(',') }",
            errors,
        },
        {
            filename,
            code: "function f(iterator: IteratorObject<number>) { iterator.join(',') }",
            errors,
        },
    ],
})
