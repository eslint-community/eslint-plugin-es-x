/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const path = require("path")
const RuleTester = require("../../tester")
const rule = require("../../../lib/rules/no-regexp-prototype-flags.js")
const ruleId = "no-regexp-prototype-flags"

new RuleTester().run(ruleId, rule, {
    valid: [
        "foo.global",
        "foo.flags",
        { code: "foo.global", settings: { es: { aggressive: true } } },
        {
            code: "foo.flags",
            options: [{ aggressive: false }],
            settings: { es: { aggressive: true } },
        },
    ],
    invalid: [
        {
            code: "foo.flags",
            errors: ["ES2015 'RegExp.prototype.flags' property is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            code: "foo.flags",
            options: [{ aggressive: true }],
            errors: ["ES2015 'RegExp.prototype.flags' property is forbidden."],
            settings: { es: { aggressive: false } },
        },
    ],
})

// -----------------------------------------------------------------------------
// TypeScript
// -----------------------------------------------------------------------------
const parser = require.resolve("@typescript-eslint/parser")
const tsconfigRootDir = path.resolve(__dirname, "../../fixtures")
const project = "tsconfig.json"
const filename = path.join(tsconfigRootDir, "test.ts")

new RuleTester({ parser }).run(`${ruleId} TS`, rule, {
    valid: [
        { filename, code: "foo.global" },
        { filename, code: "foo.flags" },
        { filename, code: "let foo = {}; foo.flags" },
        {
            filename,
            code: "foo.global",
            settings: { es: { aggressive: true } },
        },

        // `RegExp` is unknown type if tsconfig.json is not configured.
        { filename, code: "new RegExp('').flags" },
        { filename, code: "let foo = new RegExp(''); foo.flags" },
    ],
    invalid: [
        {
            filename,
            code: "/foo/.flags",
            errors: ["ES2015 'RegExp.prototype.flags' property is forbidden."],
        },
        {
            filename,
            code: "new RegExp('').flags",
            errors: ["ES2015 'RegExp.prototype.flags' property is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "let foo = new RegExp(''); foo.flags",
            errors: ["ES2015 'RegExp.prototype.flags' property is forbidden."],
            settings: { es: { aggressive: true } },
        },
        {
            filename,
            code: "foo.flags",
            errors: ["ES2015 'RegExp.prototype.flags' property is forbidden."],
            settings: { es: { aggressive: true } },
        },
    ],
})

new RuleTester({
    parser,
    parserOptions: { tsconfigRootDir, project },
}).run(`${ruleId} TS Full Type Information`, rule, {
    valid: [
        { filename, code: "foo.global" },
        { filename, code: "foo.flags" },
        { filename, code: "let foo = {}; foo.flags" },
        {
            filename,
            code: "foo.global",
            settings: { es: { aggressive: true } },
        },
    ],
    invalid: [
        {
            filename,
            code: "/foo/.flags",
            errors: ["ES2015 'RegExp.prototype.flags' property is forbidden."],
        },
        {
            filename,
            code: "new RegExp('').flags",
            errors: ["ES2015 'RegExp.prototype.flags' property is forbidden."],
        },
        {
            filename,
            code: "let foo = new RegExp(''); foo.flags",
            errors: ["ES2015 'RegExp.prototype.flags' property is forbidden."],
        },
        {
            filename,
            code: "foo.flags",
            errors: ["ES2015 'RegExp.prototype.flags' property is forbidden."],
            settings: { es: { aggressive: true } },
        },
    ],
})
