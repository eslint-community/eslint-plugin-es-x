/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-string-prototype-at.js")
const ruleId = "no-string-prototype-at"

new RuleTester().run(ruleId, rule, {
    valid: [
        "at(-1)",
        "foo.reverse()",
        "foo.at(-1)",
        { code: "at(-1)", settings: { "es-x": { aggressive: true } } },
        { code: "foo.reverse()", settings: { "es-x": { aggressive: true } } },
        {
            code: "foo.at(-1)",
            options: [{ aggressive: false }],
            settings: { "es-x": { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.at(-1)",
            errors: ["ES2022 'String.prototype.at' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            code: "foo.at(-1)",
            options: [{ aggressive: true }],
            errors: ["ES2022 'String.prototype.at' method is forbidden."],
            settings: { "es-x": { aggressive: false } },
        },
        {
            code: "'123'.at(-1)",
            errors: ["ES2022 'String.prototype.at' method is forbidden."],
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
        { filename, code: "at(-1)" },
        { filename, code: "foo.reverse()" },
        { filename, code: "foo.at(-1)" },
        { filename, code: "let foo = {}; foo.at(-1)" },
        {
            filename,
            code: "at(-1)",
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
            code: "'123'.at(-1)",
            errors: ["ES2022 'String.prototype.at' method is forbidden."],
        },
        {
            filename,
            code: "foo.at(-1)",
            errors: ["ES2022 'String.prototype.at' method is forbidden."],
            settings: { "es-x": { aggressive: true } },
        },
        {
            filename,
            code: "let foo = 'str'; foo.at(-1)",
            errors: ["ES2022 'String.prototype.at' method is forbidden."],
        },
        {
            filename,
            code: "let foo = String(42); foo.at(-1)",
            errors: ["ES2022 'String.prototype.at' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends string>(a: T) { a.at(-1) }",
            errors: ["ES2022 'String.prototype.at' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends 'a' | 'b'>(a: T) { a.at(-1) }",
            errors: ["ES2022 'String.prototype.at' method is forbidden."],
        },
        {
            filename,
            code: "function f<T extends 'a' | 'b' | 'c'>(a: T) { a.at(-1) }",
            errors: ["ES2022 'String.prototype.at' method is forbidden."],
        },
    ],
})
