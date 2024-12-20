/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-string-prototype-normalize.js")
const ruleId = "no-string-prototype-normalize"

new RuleTester().run(ruleId, rule, {
    valid: [
        "normalize('a')",
        "foo.charAt(0)",
        "foo.normalize('a')",
        { code: "normalize('a')", settings: { "es-x": { aggressive: true } } },
        { code: "foo.charAt(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.normalize('a')",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "'foo'.normalize('a')",
            errors: [
                "ES2015 'String.prototype.normalize' method is forbidden.",
            ],
        },
        {
            code: "foo.normalize('a')",
            errors: [
                "ES2015 'String.prototype.normalize' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.normalize('a')",
            options: [{ aggressive: true }],
            errors: [
                "ES2015 'String.prototype.normalize' method is forbidden.",
            ],
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
        { filename, code: "normalize('a')" },
        { filename, code: "foo.charAt(0)" },
        { filename, code: "foo.normalize('a')" },
        { filename, code: "let foo = {}; foo.normalize('a')" },
        {
            filename,
            code: "normalize('a')",
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
            code: "'foo'.normalize('a')",
            errors: [
                "ES2015 'String.prototype.normalize' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = 'foo'; foo.normalize('a')",
            errors: [
                "ES2015 'String.prototype.normalize' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = String(); foo.normalize('a')",
            errors: [
                "ES2015 'String.prototype.normalize' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends string>(a: T) { a.normalize('a') }",
            errors: [
                "ES2015 'String.prototype.normalize' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends 'a' | 'b'>(a: T) { a.normalize('a') }",
            errors: [
                "ES2015 'String.prototype.normalize' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.normalize('a')",
            errors: [
                "ES2015 'String.prototype.normalize' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
