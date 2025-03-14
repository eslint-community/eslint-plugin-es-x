/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-string-prototype-replaceall.js")
const ruleId = "no-string-prototype-replaceall"

new RuleTester().run(ruleId, rule, {
    valid: [
        "replaceAll('a')",
        "foo.charAt(0)",
        "foo.replaceAll('a')",
        { code: "replaceAll('a')", settings: { "es-x": { aggressive: true } } },
        { code: "foo.charAt(0)", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.replaceAll('a')",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "'foo'.replaceAll('a')",
            errors: [
                "ES2021 'String.prototype.replaceAll' method is forbidden.",
            ],
        },
        {
            code: "foo.replaceAll('a')",
            errors: [
                "ES2021 'String.prototype.replaceAll' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.replaceAll('a')",
            options: [{ aggressive: true }],
            errors: [
                "ES2021 'String.prototype.replaceAll' method is forbidden.",
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
        { filename, code: "replaceAll('a')" },
        { filename, code: "foo.charAt(0)" },
        { filename, code: "foo.replaceAll('a')" },
        { filename, code: "let foo = {}; foo.replaceAll('a')" },
        {
            filename,
            code: "replaceAll('a')",
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
            code: "'foo'.replaceAll('a')",
            errors: [
                "ES2021 'String.prototype.replaceAll' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = 'foo'; foo.replaceAll('a')",
            errors: [
                "ES2021 'String.prototype.replaceAll' method is forbidden.",
            ],
        },
        {
            filename,
            code: "let foo = String(); foo.replaceAll('a')",
            errors: [
                "ES2021 'String.prototype.replaceAll' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends string>(a: T) { a.replaceAll('a') }",
            errors: [
                "ES2021 'String.prototype.replaceAll' method is forbidden.",
            ],
        },
        {
            filename,
            code: "function f<T extends 'a' | 'b'>(a: T) { a.replaceAll('a') }",
            errors: [
                "ES2021 'String.prototype.replaceAll' method is forbidden.",
            ],
        },
        {
            filename,
            code: "foo.replaceAll('a')",
            errors: [
                "ES2021 'String.prototype.replaceAll' method is forbidden.",
            ],
            settings: { "es-x": { aggressive: true } },
        },
    ],
})
