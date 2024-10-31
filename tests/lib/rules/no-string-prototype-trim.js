/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-string-prototype-trim.js")
const ruleId = "no-string-prototype-trim"

new RuleTester().run(ruleId, rule, {
    valid: [
        "trim()",
        "foo.charAt(0)",
        "foo.trim()",
        { code: "trim()", settings: { "es-x": { aggressive: true } } },
        { code: "foo.charAt(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.trim()",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "'foo'.trim()",
            errors: ["ES5 'String.prototype.trim' method is forbidden."],
        },
        {
            code: "foo.trim()",
            errors: ["ES5 'String.prototype.trim' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.trim()",
            options: [{ aggressive: true }],
            errors: ["ES5 'String.prototype.trim' method is forbidden."],
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
        { filename, code: "trim()" },
        { filename, code: "foo.charAt(0)" },
        { filename, code: "foo.trim()" },
        { filename, code: "let foo = {}; foo.trim()" },
        {
            filename,
            code: "trim()",
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "foo.charAt(0)",
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: "'foo'.trim()",
            errors: ["ES5 'String.prototype.trim' method is forbidden."],
        },
        {
            filename,
            code: "let foo = 'foo'; foo.trim()",
            errors: ["ES5 'String.prototype.trim' method is forbidden."],
        },
        {
            filename,
            code: "let foo = String(); foo.trim()",
            errors: ["ES5 'String.prototype.trim' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends string>(a: T) { a.trim() }",
            errors: ["ES5 'String.prototype.trim' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends 'a' | 'b'>(a: T) { a.trim() }",
            errors: ["ES5 'String.prototype.trim' method is forbidden."],
        },
        {
            filename,
            code: "foo.trim()",
            errors: ["ES5 'String.prototype.trim' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
