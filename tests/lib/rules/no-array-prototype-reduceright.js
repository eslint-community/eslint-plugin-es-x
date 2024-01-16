/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-reduceright.js")
const ruleId = "no-array-prototype-reduceright"

new RuleTester().run(ruleId, rule, {
    valid: [
        "reduceRight(() => {})",
        "foo.reverse()",
        "foo.reduceRight(() => {})",
        {
            code: "reduceRight(() => {})",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.reverse()", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.reduceRight(() => {})",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.reduceRight(() => {})",
            errors: ["ES5 'Array.prototype.reduceRight' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.reduceRight(() => {})",
            options: [{ aggressive: true }],
            errors: ["ES5 'Array.prototype.reduceRight' method is forbidden."],
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
        { filename, code: "reduceRight(() => {})" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.reduceRight(() => {})" },
        { filename, code: "let foo = {}; foo.reduceRight(() => {})" },
        {
            filename,
            code: "reduceRight(() => {})",
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
            code: "[a, b, c].reduceRight(() => {})",
            errors: ["ES5 'Array.prototype.reduceRight' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.reduceRight(() => {})",
            errors: ["ES5 'Array.prototype.reduceRight' method is forbidden."],
        },
        {
            filename,
            code: "let foo = Array(); foo.reduceRight(() => {})",
            errors: ["ES5 'Array.prototype.reduceRight' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.reduceRight(() => {}) }",
            errors: ["ES5 'Array.prototype.reduceRight' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends readonly any[]>(a: T) { a.reduceRight(() => {}) }",
            errors: ["ES5 'Array.prototype.reduceRight' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends string[] | number[]>(a: T) { a.reduceRight(() => {}) }",
            errors: ["ES5 'Array.prototype.reduceRight' method is forbidden."],
        },
        {
            filename,
            code: "foo.reduceRight(() => {})",
            errors: ["ES5 'Array.prototype.reduceRight' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
