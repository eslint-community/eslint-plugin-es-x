/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-string-prototype-matchall.js")
const ruleId = "no-string-prototype-matchall"

new RuleTester().run(ruleId, rule, {
    valid: [
        "matchAll('a')",
        "foo.charAt(0)",
        "foo.matchAll('a')",
        { code: "matchAll('a')", settings: { "es-x": { aggressive: true } } },
        { code: "foo.charAt(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.matchAll('a')",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "'foo'.matchAll('a')",
            errors: ["ES2020 'String.prototype.matchAll' method is forbidden."],
        },
        {
            code: "foo.matchAll('a')",
            errors: ["ES2020 'String.prototype.matchAll' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.matchAll('a')",
            options: [{ aggressive: true }],
            errors: ["ES2020 'String.prototype.matchAll' method is forbidden."],
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
        { filename, code: "matchAll('a')" },
        { filename, code: "foo.charAt(0)" },
        { filename, code: "foo.matchAll('a')" },
        { filename, code: "let foo = {}; foo.matchAll('a')" },
        {
            filename,
            code: "matchAll('a')",
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
            code: "'foo'.matchAll('a')",
            errors: ["ES2020 'String.prototype.matchAll' method is forbidden."],
        },
        {
            filename,
            code: "let foo = 'foo'; foo.matchAll('a')",
            errors: ["ES2020 'String.prototype.matchAll' method is forbidden."],
        },
        {
            filename,
            code: "let foo = String(); foo.matchAll('a')",
            errors: ["ES2020 'String.prototype.matchAll' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends string>(a: T) { a.matchAll('a') }",
            errors: ["ES2020 'String.prototype.matchAll' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends 'a' | 'b'>(a: T) { a.matchAll('a') }",
            errors: ["ES2020 'String.prototype.matchAll' method is forbidden."],
        },
        {
            filename,
            code: "foo.matchAll('a')",
            errors: ["ES2020 'String.prototype.matchAll' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
