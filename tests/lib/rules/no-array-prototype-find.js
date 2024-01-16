/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-find.js")
const ruleId = "no-array-prototype-find"

new RuleTester().run(ruleId, rule, {
    valid: [
        "find(() => {})",
        "foo.reverse()",
        "foo.find(() => {})",
        { code: "find(() => {})", settings: { "es-x": { aggressive: true } } },
        { code: "foo.reverse()", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.find(() => {})",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.find(() => {})",
            errors: ["ES2015 'Array.prototype.find' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.find(() => {})",
            options: [{ aggressive: true }],
            errors: ["ES2015 'Array.prototype.find' method is forbidden."],
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
        { filename, code: "find(() => {})" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.find(() => {})" },
        { filename, code: "let foo = {}; foo.find(() => {})" },
        {
            filename,
            code: "find(() => {})",
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
            code: "[a, b, c].find(() => {})",
            errors: ["ES2015 'Array.prototype.find' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.find(() => {})",
            errors: ["ES2015 'Array.prototype.find' method is forbidden."],
        },
        {
            filename,
            code: "let foo = Array(); foo.find(() => {})",
            errors: ["ES2015 'Array.prototype.find' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.find(() => {}) }",
            errors: ["ES2015 'Array.prototype.find' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends readonly any[]>(a: T) { a.find(() => {}) }",
            errors: ["ES2015 'Array.prototype.find' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends string[] | number[]>(a: T) { a.find(() => {}) }",
            errors: ["ES2015 'Array.prototype.find' method is forbidden."],
        },
        {
            filename,
            code: "foo.find(() => {})",
            errors: ["ES2015 'Array.prototype.find' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
