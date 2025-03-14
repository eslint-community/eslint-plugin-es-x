/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-array-prototype-flat.js")
const ruleId = "no-array-prototype-flat"

new RuleTester().run(ruleId, rule, {
    valid: [
        "flat(1)",
        "flatMap(() => {})",
        "foo.reverse()",
        "foo.flat(1)",
        "foo.flatMap(() => {})",
        { code: "flat(1)", settings: { "es-x": { aggressive: true } } },
        {
            code: "flatMap(() => {})",
            settings: { "es-x": { aggressive: true } },
        },
        { code: "foo.reverse()", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.flat(1)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.flat(1)",
            errors: ["ES2019 'Array.prototype.flat' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.flatMap(() => {})",
            errors: ["ES2019 'Array.prototype.flatMap' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.flat(1)",
            options: [{ aggressive: true }],
            errors: ["ES2019 'Array.prototype.flat' method is forbidden."],
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
        { filename, code: "flat(1)" },
        { filename, code: "flatMap(() => {})" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.flat(1)" },
        { filename, code: "foo.flatMap(() => {})" },
        { filename, code: "let foo = {}; foo.flat(1)" },
        { filename, code: "let foo = {}; foo.flatMap(() => {})" },
        {
            filename,
            code: "flat(1)",
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "flatMap(() => {})",
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
            code: "[a, b, c].flat(1)",
            errors: ["ES2019 'Array.prototype.flat' method is forbidden."],
        },
        {
            filename,
            code: "[a, b, c].flatMap(() => {})",
            errors: ["ES2019 'Array.prototype.flatMap' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.flat(1)",
            errors: ["ES2019 'Array.prototype.flat' method is forbidden."],
        },
        {
            filename,
            code: "let foo = []; foo.flatMap(() => {})",
            errors: ["ES2019 'Array.prototype.flatMap' method is forbidden."],
        },
        {
            filename,
            code: "let foo = Array(); foo.flat(1)",
            errors: ["ES2019 'Array.prototype.flat' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends any[]>(a: T) { a.flat(1) }",
            errors: ["ES2019 'Array.prototype.flat' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends readonly any[]>(a: T) { a.flat(1) }",
            errors: ["ES2019 'Array.prototype.flat' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends string[] | number[]>(a: T) { a.flat(1) }",
            errors: ["ES2019 'Array.prototype.flat' method is forbidden."],
        },
        {
            filename,
            code: "foo.flat(1)",
            errors: ["ES2019 'Array.prototype.flat' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.flatMap(() => {})",
            errors: ["ES2019 'Array.prototype.flatMap' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
