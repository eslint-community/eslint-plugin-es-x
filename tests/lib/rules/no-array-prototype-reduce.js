/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-reduce.js")
const ruleId = "no-array-prototype-reduce"

new RuleTester().run(ruleId, rule, {
    valid: [
        "reduce(() => {})",
        "foo.reverse()",
        "foo.reduce(() => {})",
        {
            code: "reduce(() => {})",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.reverse()", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.reduce(() => {})",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.reduce(() => {})",
            errors: ["ES5 'Array.prototype.reduce' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.reduce(() => {})",
            options: [{ aggressive: true }],
            errors: ["ES5 'Array.prototype.reduce' method is forbidden."],
            settings: { "es-x": { aggressive: false } },
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
        { filename, code: "reduce(() => {})" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.reduce(() => {})" },
        { filename, code: "let foo = {}; foo.reduce(() => {})" },
        {
            filename,
            code: "reduce(() => {})",
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.reverse()",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: "[a, b, c].reduce(() => {})",
            errors: ["ES5 'Array.prototype.reduce' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.reduce(() => {})",
            errors: ["ES5 'Array.prototype.reduce' method is forbidden."],
        },
        {
            filename,
            code: "let foo = Array(); foo.reduce(() => {})",
            errors: ["ES5 'Array.prototype.reduce' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.reduce(() => {}) }",
            errors: ["ES5 'Array.prototype.reduce' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends readonly any[]>(a: T) { a.reduce(() => {}) }",
            errors: ["ES5 'Array.prototype.reduce' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends string[] | number[]>(a: T) { a.reduce(() => {}) }",
            errors: ["ES5 'Array.prototype.reduce' method is forbidden."],
        },
        {
            filename,
            code: "foo.reduce(() => {})",
            errors: ["ES5 'Array.prototype.reduce' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
