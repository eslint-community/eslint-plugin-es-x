/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-findindex.js")
const ruleId = "no-array-prototype-findIndex"

new RuleTester().run(ruleId, rule, {
    valid: [
        "findIndex(() => {})",
        "foo.reverse()",
        "foo.findIndex(() => {})",
        {
            code: "findIndex(() => {})",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.reverse()", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.findIndex(() => {})",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.findIndex(() => {})",
            errors: ["ES2015 'Array.prototype.findIndex' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.findIndex(() => {})",
            options: [{ aggressive: true }],
            errors: ["ES2015 'Array.prototype.findIndex' method is forbidden."],
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
    languageOptions: { parser, parserOptions: { tsconfigRootDir, project } },
}).run(`${ruleId} TS Full Type Information`, rule, {
    valid: [
        { filename, code: "findIndex(() => {})" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.findIndex(() => {})" },
        { filename, code: "let foo = {}; foo.findIndex(() => {})" },
        {
            filename,
            code: "findIndex(() => {})",
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
            code: "[a, b, c].findIndex(() => {})",
            errors: ["ES2015 'Array.prototype.findIndex' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.findIndex(() => {})",
            errors: ["ES2015 'Array.prototype.findIndex' method is forbidden."],
        },
        {
            filename,
            code: "let foo = Array(); foo.findIndex(() => {})",
            errors: ["ES2015 'Array.prototype.findIndex' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.findIndex(() => {}) }",
            errors: ["ES2015 'Array.prototype.findIndex' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends readonly any[]>(a: T) { a.findIndex(() => {}) }",
            errors: ["ES2015 'Array.prototype.findIndex' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends string[] | number[]>(a: T) { a.findIndex(() => {}) }",
            errors: ["ES2015 'Array.prototype.findIndex' method is forbidden."],
        },
        {
            filename,
            code: "foo.findIndex(() => {})",
            errors: ["ES2015 'Array.prototype.findIndex' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
