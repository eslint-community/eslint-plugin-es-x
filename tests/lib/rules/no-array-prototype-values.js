/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-values.js")
const ruleId = "no-array-prototype-values"

new RuleTester().run(ruleId, rule, {
    valid: [
        "values()",
        "foo.reverse()",
        "foo.values()",
        { code: "values()", settings: { "es-x": { aggressive: true } } },
        { code: "foo.reverse()", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.values()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.values()",
            errors: ["ES2015 'Array.prototype.values' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.values()",
            options: [{ aggressive: true }],
            errors: ["ES2015 'Array.prototype.values' method is forbidden."],
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
            disallowAutomaticSingleRunInference: false,
        },
    },
}).run(`${ruleId} TS Full Type Information`, rule, {
    valid: [
        { filename, code: "values()" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.values()" },
        { filename, code: "let foo = {}; foo.values()" },
        {
            filename,
            code: "values()",
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
            code: "[a, b, c].values()",
            errors: ["ES2015 'Array.prototype.values' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.values()",
            errors: ["ES2015 'Array.prototype.values' method is forbidden."],
        },
        {
            filename,
            code: "let foo = Array(); foo.values()",
            errors: ["ES2015 'Array.prototype.values' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.values() }",
            errors: ["ES2015 'Array.prototype.values' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends readonly any[]>(a: T) { a.values() }",
            errors: ["ES2015 'Array.prototype.values' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends string[] | number[]>(a: T) { a.values() }",
            errors: ["ES2015 'Array.prototype.values' method is forbidden."],
        },
        {
            filename,
            code: "foo.values()",
            errors: ["ES2015 'Array.prototype.values' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
